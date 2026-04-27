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
import Link from 'next/link';
import GalleryView from '@/components/sections/GalleryView';
import { getCollections } from '@/lib/gallery';
import { GalleryCollection } from '@/lib/types/types';
import HorizontalScroller from '@/components/ui/HorizontalScroller';
import { AboutPage, WithContext } from 'schema-dts';
import Script from 'next/script';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import PostList from '@/components/ui/PostList';

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

			<section className="flex flex-col">
				<h2 className="mb-6">Recent work</h2>

				<div className="grid md:grid-cols-2 gap-6">
					{professionalProjects.slice(0, 2).map((project) => (
						<Card key={project.title} item={{ ...project, subtitle: project.date }} />
					))}
				</div>

				<Button asChild variant="ghost" className="text-sm ml-auto mt-3">
					<Link href="/work" aria-label="View more work projects">
						More projects
					</Link>
				</Button>
			</section>

			<section className="prose max-w-3xl">
				<h2 className="not-prose text-foreground">About</h2>
				<div className="">
					{about.map((c, i) => (
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

			{blogPosts.length > 0 && (
				<section className="flex flex-col">
					<h2 className="mb-6">Writing</h2>
					<PostList posts={blogPosts.slice(0, 3)} />

					{blogPosts.length > 3 && (
						<Button asChild variant="ghost" className="text-sm ml-auto mt-3">
							<Link href="/writing" aria-label="View more articles">
								Read more
							</Link>
						</Button>
					)}
				</section>
			)}

			{collections.length >= 3 && (
				<section className="flex flex-col">
					<h2 className="mb-6">Photography</h2>

					<GalleryView as="collections" content={collections.slice(0, 3)} />

					<Button asChild variant="ghost" className="text-sm ml-auto mt-3">
						<Link href="/photography" aria-label="View more photography">
							Visit gallery
						</Link>
					</Button>
				</section>
			)}

			<section className="space-y-6">
				<h2>Colophon</h2>
				{colophon.map((c) => (
					<div key={c.heading} className="sm:grid grid-cols-12 gap-2">
						<h3 className="text-sm col-span-3 mb-1 mt-1 text-foreground-tertiary">{c.heading}</h3>
						<p className="col-span-9 prose">{c.text}</p>
					</div>
				))}
			</section>
		</>
	);
}

const about = [
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

const colophon = [
	{
		heading: 'Overview',
		text: (
			<>
				This site is built for speed, clarity, and ease of use. I designed and developed it myself
				with a focus on clean code, simple layouts, and a smooth user experience.
			</>
		),
	},
	{
		heading: 'Technologies',
		text: (
			<>
				It runs on <CustomLink href="https://nextjs.org">Next.js</CustomLink> (App Router),{' '}
				<CustomLink href="https://react.dev">React</CustomLink>, and{' '}
				<CustomLink href="https://typescriptlang.org">TypeScript</CustomLink>, styled with{' '}
				<CustomLink href="https://tailwindcss.com">Tailwind</CustomLink> and a few custom utilities.
				Most content is static for performance, with some dynamic parts powered by server components
				and edge functions.
			</>
		),
	},
];
