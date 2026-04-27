import PageHeader from '@/components/layouts/PageHeader';
import GalleryView from '@/components/sections/GalleryView';
import { SITE_NAME, SITE_URL } from '@/data/constants';
import { galleryCollections } from '@/data/gallery';
import { getCollections } from '@/lib/gallery';
import { GalleryCollection } from '@/lib/types/types';
import { slugify } from '@/lib/utils';
import { Metadata } from 'next';
import Script from 'next/script';
import { CollectionPage, WithContext } from 'schema-dts';

const title = 'Photography';
const description = "Collections of photos I've taken. Work in progress.";

export async function generateMetadata(): Promise<Metadata> {
	const ogImage = galleryCollections[0]?.cover as string;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			images: [
				{
					url: `/api/ogGallery?title=${encodeURIComponent(
						title,
					)}&subtitle=${encodeURIComponent('Collections')}&image=${encodeURIComponent(ogImage)}`,
					width: 1200,
					height: 630,
					alt: `${title} cover image`,
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
						title,
					)}&subtitle=${encodeURIComponent('Collections')}&image=${encodeURIComponent(ogImage)}`,
					width: 1200,
					height: 630,
					alt: `${title} cover image`,
				},
			],
			card: 'summary_large_image',
		},
	};
}

export default async function Photography() {
	const collections = (await getCollections()) as GalleryCollection[];

	const jsonLd: WithContext<CollectionPage> = {
		'@type': 'CollectionPage',
		'@context': 'https://schema.org',
		name: `${SITE_NAME} - ${title}`,
		description,
		url: `${SITE_URL}/photography`,
		mainEntity: {
			'@type': 'ItemList',
			itemListElement: galleryCollections.map((collection) => ({
				'@type': 'ImageGallery',
				name: collection.title,
				description: collection.description,
				url: `${SITE_URL}/photography/${slugify(collection.title)}`,
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

			<PageHeader title={title} content={description} />

			<section>
				<GalleryView as="collections" content={collections} />
			</section>
		</>
	);
}
