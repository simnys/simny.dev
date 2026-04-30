import 'server-only';

import { GALLERY_COLLECTIONS_TAG_PREFIX } from '@/data/gallery';
import { v2 as cloudinary } from 'cloudinary';
import { getPlaiceholder } from 'plaiceholder';
import { getCldImageUrl } from 'next-cloudinary';
import { unstable_cache } from 'next/cache';
import { galleryCollections } from '../data/gallery';
import { GalleryCollectionType, GalleryImageType, StaticImage } from './types/types';
import { slugify } from './utils';

export const GALLERY_CACHE_TAG = 'gallery';

type CloudinaryResource = {
	width: number;
	height: number;
	public_id: string;
	secure_url: string;
	tags?: string[];
	context?: {
		custom?: {
			alt?: string;
		};
	};
};

async function createBlurDataURL(src: string): Promise<string> {
	const imageUrl = getCldImageUrl({
		src,
		width: 20,
		quality: '30',
		format: 'avif',
	});
	const response = await fetch(imageUrl);
	const buffer = Buffer.from(await response.arrayBuffer());
	const { base64 } = await getPlaiceholder(buffer);
	return base64;
}

async function mapGalleryImages(resources: CloudinaryResource[]): Promise<GalleryImageType[]> {
	return Promise.all(
		resources.map(async ({ width, height, public_id, secure_url, tags = [], context }) => ({
			id: public_id,
			src: secure_url,
			alt: context?.custom?.alt,
			blurData: await createBlurDataURL(public_id),
			width,
			height,
			tags,
		})),
	);
}

async function fetchGalleryResources(): Promise<CloudinaryResource[]> {
	try {
		const results = await cloudinary.api.resources({
			type: 'upload',
			resource_type: 'image',
			max_results: 500,
			tags: true,
		});

		if (!results || !Array.isArray(results.resources)) {
			throw new Error('Invalid response from Cloudinary');
		}

		return results.resources as CloudinaryResource[];
	} catch (error) {
		console.error('Error fetching images:', error);
		throw new Error('Failed to fetch images');
	}
}

export const getAllImages = unstable_cache(
	async (): Promise<GalleryImageType[]> => {
		const resources = await fetchGalleryResources();
		const images = await mapGalleryImages(resources);
		return images;
	},
	['gallery-images'],
	{ tags: [GALLERY_CACHE_TAG] },
);

export const getImagesInCollection = unstable_cache(
	async (name: string): Promise<GalleryImageType[]> => {
		const tag = `${GALLERY_COLLECTIONS_TAG_PREFIX}${name.toLowerCase()}`;

		try {
			const resources = await getAllImages();
			return resources.filter((img) => img.tags.includes(tag));
		} catch (error) {
			console.error(`Error fetching ${name} images:`, error);
			return [];
		}
	},
	['gallery-images-in-collection'],
	{ tags: [GALLERY_CACHE_TAG] },
);

export const getCollections = unstable_cache(
	async (): Promise<GalleryCollectionType[]> => {
		try {
			const resources = await getAllImages();

			return Promise.all(
				galleryCollections.map(async (collection) => ({
					...collection,
					cover: {
						src: collection.cover,
						blurData: await createBlurDataURL(collection.cover),
						alt: `${collection.title} cover image`,
					} satisfies StaticImage,
					length: resources.filter((img) =>
						img.tags.includes(`${GALLERY_COLLECTIONS_TAG_PREFIX}${slugify(collection.title)}`),
					).length,
				})),
			);
		} catch (error) {
			console.error('Error fetching collection cover images:', error);
			return [];
		}
	},
	['gallery-collections'],
	{ tags: [GALLERY_CACHE_TAG] },
);
