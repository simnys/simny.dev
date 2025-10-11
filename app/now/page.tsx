import CustomLink from '@/components/blog/Link';
import PageHeader from '@/components/layouts/PageHeader';
import { Section } from '@/components/layouts/Section';
import { Card, CardBody } from '@/components/ui/Card';

import {
	RAINDROP_COLLECTION_ID,
	SITE_CONTACT,
	SITE_DESCRIPTION,
	SITE_GITHUB_URL,
	SITE_INSTAGRAM_URL,
	SITE_LINKEDIN_URL,
	SITE_NAME,
	SITE_URL,
} from '@/data/constants';
import { IconLink } from '@/data/icons';
import { getRaindropCollection } from '@/lib/raindrop';

import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { AboutPage, WithContext } from 'schema-dts';

export const metadata: Metadata = {
	title: 'Now',
};

export default async function Now() {
	const bookmarks = await getRaindropCollection(RAINDROP_COLLECTION_ID);

	const jsonLd: WithContext<AboutPage> = {
		'@type': 'AboutPage',
		'@context': 'https://schema.org',
		url: SITE_URL,
		mainEntity: {
			'@type': 'Person',
			name: SITE_NAME,
			description: SITE_DESCRIPTION,
			email: SITE_CONTACT,
			url: SITE_URL,
			image: `${SITE_URL}/images/avatar.jpg`,
			sameAs: [SITE_GITHUB_URL, SITE_LINKEDIN_URL, SITE_INSTAGRAM_URL],
			jobTitle: 'Front-end Engineer & Photographer',
		},
	};

	return (
		<div>
			<Script
				type="application/ld+json"
				id="about_jsonLd"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>

			<PageHeader title="Now" />

			<Section className="px-4 md:px-6 max-w-3xl mx-auto">
				<h2 className="text-xl mb-2">Favorite reads</h2>
				<ul className="flex flex-col gap-4">
					{bookmarks?.map((bookmark) => (
						<li key={bookmark.link} className="">
							<div rel="noopener noreferrer">
								<CustomLink href={bookmark.link} className="font-medium">
									{bookmark.title}
								</CustomLink>
								{bookmark.note && <p className="text-foreground-secondary mb-1">{bookmark.note}</p>}
								<span className="text-xs flex items-center gap-1 text-foreground-secondary/80">
									<IconLink />
									{bookmark.domain}
								</span>
							</div>
						</li>
					))}
				</ul>
			</Section>
		</div>
	);
}
