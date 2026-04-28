import { SITE_NAME, SITE_URL } from '@/data/constants';

import type { Metadata, ResolvingMetadata } from 'next';

type PageMetadataOptions = {
	title: string;
	description: string;
	canonical: string;
	openGraph?: Metadata['openGraph'];
	twitter?: Metadata['twitter'];
};

export async function buildPageMetadata(
	{ title, description, canonical, openGraph, twitter }: PageMetadataOptions,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const previousMetadata = await parent;
	const absoluteUrl = canonical === '/' ? SITE_URL : `${SITE_URL}${canonical}`;
	const fullTitle = `${title} | ${SITE_NAME}`;

	return {
		title,
		description,
		alternates: {
			canonical,
		},
		openGraph: {
			...(previousMetadata.openGraph ?? {}),
			title: fullTitle,
			description,
			url: absoluteUrl,
			images: openGraph?.images ?? previousMetadata.openGraph?.images,
			...openGraph,
		},
		twitter: {
			...(previousMetadata.twitter ?? {}),
			title: fullTitle,
			description,
			images: twitter?.images ?? previousMetadata.twitter?.images,
			...twitter,
		},
	};
}
