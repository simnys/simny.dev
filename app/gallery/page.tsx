import PageHeader from '@/components/layouts/PageHeader';
import { Section } from '@/components/layouts/Section';
import GalleryView from '@/components/sections/GalleryView';
import { SITE_NAME, SITE_URL } from '@/data/constants';
import { galleryCollections, galleryImagesStatic } from '@/data/gallery';
import { IconGallery } from '@/data/icons';
import { getCollections } from '@/lib/gallery';
import { GalleryCollection } from '@/lib/types';
import { slugify } from '@/lib/utils';
import { Metadata } from 'next';
import Script from 'next/script';
import { CollectionPage, WithContext } from 'schema-dts';

const title = 'Photo Gallery';
const description = "Moments, places, and details I've noticed along the way.";

export async function generateMetadata(): Promise<Metadata> {
	const ogImage = galleryImagesStatic[0];

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			images: [
				{
					url: `/api/ogGallery?title=${encodeURIComponent(
						'Collections'
					)}&subtitle=${encodeURIComponent('Photo Gallery')}&image=${encodeURIComponent(ogImage)}`,
					width: 1200,
					height: 630,
					alt: `Photo Gallery cover image`,
					type: 'image/png',
				},
			],
		},
		twitter: {
			title,
			description,
			images: [
				{
					url: `/api/ogGallery?title=${encodeURIComponent(
						'Collections'
					)}&subtitle=${encodeURIComponent('Photo Gallery')}&image=${encodeURIComponent(ogImage)}`,
					width: 1200,
					height: 630,
					alt: `Photo Gallery cover image`,
				},
			],
			card: 'summary_large_image',
		},
	};
}

export default async function Gallery() {
	const collections = (await getCollections()) as GalleryCollection[];

	const jsonLd: WithContext<CollectionPage> = {
		'@type': 'CollectionPage',
		'@context': 'https://schema.org',
		name: `${SITE_NAME} - Photo Gallery`,
		description,
		url: `${SITE_URL}/gallery`,
		mainEntity: {
			'@type': 'ItemList',
			itemListElement: galleryCollections.map((collection) => ({
				'@type': 'ImageGallery',
				name: collection.title,
				description: collection.description,
				url: `${SITE_URL}/gallery/${slugify(collection.title)}`,
			})),
		},
	};

	return (
		<>
			<Script
				type="application/ld+json"
				id="gallery_jsonLd"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>

			<PageHeader
				title="Photo Gallery"
				content="Moments, places, and details I've noticed along the way."
				subtitle={{ text: 'Collections', Icon: IconGallery }}
			/>

			<Section>
				<GalleryView as="collections" content={collections} />
			</Section>
		</>
	);
}
