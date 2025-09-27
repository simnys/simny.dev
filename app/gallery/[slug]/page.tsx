import PageHeader from '@/components/layouts/PageHeader';
import { Section } from '@/components/layouts/Section';
import GalleryView from '@/components/sections/GalleryView';

import { SITE_NAME, SITE_URL } from '@/data/constants';
import { galleryCollections } from '@/data/gallery';
import { IconGallery } from '@/data/icons';
import { getImagesInCollection } from '@/lib/gallery';
import { GalleryImage } from '@/lib/types';
import { slugify } from '@/lib/utils';

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { ImageGallery, WithContext } from 'schema-dts';

interface Props {
	params: Promise<{
		slug: string;
	}>;
}

export async function generateMetadata(props: Props): Promise<Metadata | undefined> {
	const params = await props.params;
	const collection = galleryCollections.find((item) => slugify(item.title) === params.slug);
	if (!collection) return notFound();

	const { title, description, cover } = collection;

	return {
		title: `${title} Photo Gallery`,
		description,
		openGraph: {
			title: `${title} Photo Gallery`,
			description,
			url: `${SITE_URL}/gallery/${slugify(collection.title)}`,
			images: [
				{
					url: `/api/ogGallery?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(
						'Photo Gallery'
					)}&image=${encodeURIComponent((cover as string) || '')}`,
					width: 1200,
					height: 630,
					alt: `${title} Photo Gallery cover image`,
					type: 'image/png',
				},
			],
		},
		twitter: {
			title: `${title} Photo Gallery`,
			description,
			images: [
				{
					url: `/api/ogGallery?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(
						'Photo Gallery'
					)}&image=${encodeURIComponent((cover as string) || '')}`,
					width: 1200,
					height: 630,
					alt: `${title} Photo Gallery cover image`,
				},
			],
			card: 'summary_large_image',
		},
	};
}

export default async function GalleryCollection(props: Props) {
	const params = await props.params;
	const index = galleryCollections.findIndex((item) => slugify(item.title) === params.slug);
	if (index === -1) return notFound();

	const collection = galleryCollections[index];
	const images = (await getImagesInCollection(params.slug)) as GalleryImage[];

	const previousIndex = (index - 1 + galleryCollections.length) % galleryCollections.length;
	const nextIndex = (index + 1) % galleryCollections.length;
	const previousCollection = galleryCollections[previousIndex];
	const nextCollection = galleryCollections[nextIndex];

	const backLink = '/gallery';

	const jsonLd: WithContext<ImageGallery> = {
		'@type': 'ImageGallery',
		'@context': 'https://schema.org',
		name: `${SITE_NAME} Photo Gallery - ${collection.title}`,
		description: collection.description,
		url: `${SITE_URL}/gallery/${slugify(collection.title)}`,
		image: images.slice(0, 3).map((img) => img.src),
	};

	return (
		<main className="grow">
			<Script
				type="application/ld+json"
				id={`gallery-${slugify(collection.title)}_jsonLd`}
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>

			<PageHeader
				title={collection.title}
				subtitle={{ text: 'Gallery', Icon: IconGallery }}
				content={collection.description}
				backlink={backLink}
			/>

			<Section className="pb-10">
				<GalleryView content={images} as="images" />
			</Section>

			<div className="pb-10 w-full flex justify-between items-baseline text-sm font-medium select-none">
				<Link
					href={`${backLink}/${slugify(previousCollection.title)}`}
					className="flex-1 px-4 sm:mx-4 sm:px-6 py-4 rounded-lg text-foreground/80 transition-colors hover:bg-foreground-tertiary/5 hover:text-foreground"
				>
					<span className="block text-xs text-foreground-tertiary">Prev</span>
					{previousCollection.title}
				</Link>

				<Link
					href={backLink}
					className="hidden sm:block text-center flex-1 px-4 sm:mx-4 sm:px-6 py-4 rounded-lg text-foreground/80 transition-colors hover:bg-foreground-tertiary/5 hover:text-foreground"
				>
					<span className="block text-xs text-foreground-tertiary">Collections</span>
					Index
				</Link>

				<Link
					href={`${backLink}/${slugify(nextCollection.title)}`}
					className="text-right flex-1 px-4 sm:mx-4 sm:px-6 py-4 rounded-lg text-foreground/80 transition-colors hover:bg-foreground-tertiary/5 hover:text-foreground"
				>
					<span className="block text-xs text-foreground-tertiary">Next</span>
					{nextCollection.title}
				</Link>
			</div>
		</main>
	);
}

export async function generateStaticParams() {
	return galleryCollections.map((item) => ({ slug: slugify(item.title) }));
}
