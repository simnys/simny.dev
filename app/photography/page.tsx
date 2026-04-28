import PageHeader from '@/components/layouts/PageHeader';
import GalleryView from '@/components/sections/GalleryView';
import StructuredData from '@/components/seo/StructuredData';
import { SITE_NAME, SITE_URL } from '@/data/constants';
import { galleryCollections } from '@/data/gallery';
import { getCollections } from '@/lib/gallery';
import { slugify } from '@/lib/utils';
import { Metadata } from 'next';
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
	const collections = await getCollections();

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
			<StructuredData id="gallery_jsonLd" data={jsonLd} />

			<PageHeader title={title} content={description} />

			<section>
				<GalleryView as="collections" content={collections} />
			</section>
		</>
	);
}
