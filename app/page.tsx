import CustomLink from '@/components/blog/Link';
import Hero from '@/components/sections/Hero';

import {
	SITE_CONTACT,
	SITE_DESCRIPTION,
	SITE_GITHUB_URL,
	SITE_INSTAGRAM_URL,
	SITE_LINKEDIN_URL,
	SITE_NAME,
	SITE_URL,
} from '@/data/constants';
import { professionalProjects, technologies } from '@/data/projects';
import { getBlogPosts, getLatestBlogPost } from '@/lib/blog';
import { cn } from '@/lib/utils';

import { Metadata } from 'next';
import { Icon } from '@/components/ui/Icon';
import Link from 'next/link';
import GalleryView from '@/components/sections/GalleryView';
import { getCollections } from '@/lib/gallery';
import { GalleryCollection } from '@/lib/types/types';
import HorizontalScroller from '@/components/ui/HorizontalScroller';
import { AboutPage, WithContext } from 'schema-dts';
import Script from 'next/script';
import { Card } from '@/components/ui/Card';
import Divider from '@/components/blog/Divider';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
	alternates: {
		canonical: SITE_URL,
	},
};

export default async function Home() {
	const blogPosts = getBlogPosts();
	const latestPost = getLatestBlogPost();
	const collections = (await getCollections()) as GalleryCollection[];

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
			jobTitle: 'Web Engineer & Photographer',
		},
	};

	return (
		<>
			<Script
				type="application/ld+json"
				id="about_jsonLd"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>

			<section className="flex flex-col gap-6 relative py-12 sm:py-22 -mx-6 px-6 border-b">
				<Hero />
				<div
					className={cn(
						'absolute inset-0 pointer-events-none m-0',
						'bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:60px_60px]',
						'dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px]',
					)}
					style={{
						WebkitMaskImage: 'radial-gradient(circle at 50% 50%, white 50%, transparent 100%)',
						maskImage: 'radial-gradient(circle at 50% 50%, white 50%, transparent 100%)',
					}}
				/>
			</section>

			<section className="flex flex-col space-y-4">
				<h2>Recent work</h2>

				<div className="grid md:grid-cols-2 gap-6">
					{professionalProjects.slice(0, 2).map((project) => (
						<Card key={project.title} item={{ ...project, subtitle: project.date }} />
					))}
				</div>

				<Button asChild variant="ghost" className="text-sm ml-auto">
					<Link href="/work" aria-label="View more work projects">
						View more
					</Link>
				</Button>
			</section>

			<section className="prose max-w-3xl">
				<h2 className="">About</h2>
				<div className="">
					{content.map((c, i) => (
						<p key={i}>{c.text}</p>
					))}
				</div>

				<div className="mt-8">
					<HorizontalScroller
						items={technologies.slice(0, technologies.length / 2)}
						speed="slow"
						separator="•"
						className="not-prose select-none mb-2"
						pauseOnHover={false}
					/>
					<HorizontalScroller
						items={technologies.slice(technologies.length / 2)}
						speed="slow"
						separator="•"
						className="not-prose select-none"
						pauseOnHover={false}
					/>
				</div>
			</section>

			{collections.length >= 3 && (
				<section className="flex flex-col space-y-4">
					<h2>Photography</h2>

					<GalleryView as="collections" content={collections.slice(0, 3)} />

					<Button asChild variant="ghost" className="text-sm ml-auto">
						<Link href="/photography" aria-label="View more photography">
							View gallery
						</Link>
					</Button>
				</section>
			)}
		</>
	);
}

const content = [
	{
		heading: 'Overview',
		text: (
			<>
				{`I spend most of my days working with React, Next.js, and Tailwind CSS, building sites and apps that (hopefully) make people's lives a little easier or more fun. I'm always tinkering, learning new tricks, and trying out fresh ideas—there's always something new to explore.`}
			</>
		),
	},
	{
		heading: 'Technologies',
		text: (
			<>
				{`When I'm not deep in code, you'll probably find me with a camera in hand. Photography lets me slow down and notice the little things—whether it's a cool landscape, city vibes, or just everyday moments. It's my way of capturing stories and memories.`}
			</>
		),
	},
	{
		heading: 'Design & Colors',
		text: (
			<>
				{`Outside of work and photography, I love getting outdoors, traveling, or just kicking back with a good book. If you ever want to chat about tech, photos, or favorite hiking spots, I'm always up for it!`}
			</>
		),
	},
];
