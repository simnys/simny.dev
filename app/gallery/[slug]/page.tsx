import PageHeader from '@/components/layouts/PageHeader';
import { Section } from '@/components/layouts/Section';
import GalleryView from '@/components/sections/GalleryView';
import { Button } from '@/components/ui/Button';

import { SITE_NAME, SITE_URL } from '@/data/constants';
import { galleryCollections } from '@/data/gallery';
import { getImagesInCollection } from '@/lib/gallery';
import { GalleryImage } from '@/lib/types/types';
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
		<>
			<Script
				type="application/ld+json"
				id={`gallery-${slugify(collection.title)}_jsonLd`}
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>

			<PageHeader title={collection.title} content={collection.description} backlink={backLink} />

			<section>
				<GalleryView content={images} as="images" />
			</section>

			<div className="-mx-4 flex justify-between items-baseline text-sm font-medium select-none">
				<Button asChild variant="ghost" className="text-foreground-secondary">
					<Link
						href={`${backLink}/${slugify(previousCollection.title)}`}
						className="flex-col flex-1 h-15 items-start"
					>
						<span className="block font-mono uppercase text-[12px] text-foreground-tertiary">
							Prev
						</span>
						{previousCollection.title}
					</Link>
				</Button>

				<Button asChild variant="ghost" className="text-foreground-secondary">
					<Link href={backLink} className="hidden sm:inline-flex flex-col flex-1 h-15 text-center">
						<span className="block font-mono uppercase text-[12px] text-foreground-tertiary">
							Collections
						</span>
						Index
					</Link>
				</Button>

				<Button asChild variant="ghost" className="text-foreground-secondary">
					<Link
						href={`${backLink}/${slugify(nextCollection.title)}`}
						className="flex-col flex-1 h-15 items-end text-right"
					>
						<span className="block font-mono uppercase text-[12px] text-foreground-tertiary">
							Next
						</span>
						{nextCollection.title}
					</Link>
				</Button>
			</div>
		</>
	);
}

export async function generateStaticParams() {
	return galleryCollections.map((item) => ({ slug: slugify(item.title) }));
}
