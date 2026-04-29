import Hero from '@/components/sections/Hero';
import GalleryView from '@/components/sections/GalleryView';
import StructuredData from '@/components/seo/StructuredData';

import {
	SITE_CONTACT,
	SITE_DESCRIPTION,
	SITE_GITHUB_URL,
	SITE_INSTAGRAM_URL,
	SITE_LINKEDIN_URL,
	SITE_NAME,
	SITE_URL,
} from '@/data/constants';
import { professionalProjects } from '@/data/projects';
import { getBlogPosts } from '@/lib/blog';
import { cn } from '@/lib/utils';

import { Metadata } from 'next';
import Link from 'next/link';
import { getCollections } from '@/lib/gallery';
import { AboutPage, WithContext } from 'schema-dts';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import PostList from '@/components/ui/PostList';
import CustomLink from '@/components/blog/Link';

export const metadata: Metadata = {
	alternates: {
		canonical: '/',
	},
};

export default async function Home() {
	const blogPosts = getBlogPosts();
	const collections = await getCollections();

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
			image: `${SITE_URL}/images/pixel.png`,
			sameAs: [SITE_GITHUB_URL, SITE_LINKEDIN_URL, SITE_INSTAGRAM_URL],
			jobTitle: 'Web Engineer',
		},
	};

	return (
		<>
			<StructuredData id="about_jsonLd" data={jsonLd} />

			<section className="flex flex-col gap-6 relative py-12 sm:py-22 -mx-6 px-6 border-b">
				<Hero />
				<div
					className={cn(
						'absolute inset-0 pointer-events-none m-0',
						'bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)]',
						'dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]',
					)}
					style={{
						backgroundSize: '60px 60px',
						WebkitMaskImage: 'radial-gradient(circle at 50% 50%, white 50%, transparent 100%)',
						maskImage: 'radial-gradient(circle at 50% 50%, white 50%, transparent 100%)',
					}}
				/>
			</section>

			<section className="flex flex-col max-w-[65ch] w-full mx-auto">
				<h2 className="mb-6">Recent work</h2>

				<div className="grid md:grid-cols-2 gap-4 sm:gap-6">
					{professionalProjects.slice(0, 2).map((project) => (
						<Card key={project.title} item={{ ...project, subtitle: project.date }} />
					))}
				</div>

				<CustomLink
					href="/work"
					className="text-sm ml-auto mt-4 text-foreground-tertiary hover:text-foreground decoration-dotted"
					aria-label="View more work projects"
				>
					More work
				</CustomLink>
			</section>

			<section className="max-w-[65ch] w-full mx-auto">
				<h2 className="text-foreground mb-6">About</h2>
				<div className="prose">
					<p>
						I've had the privilege of working on a wide range of projects, from sleek tools to
						enterprise solutions. I thrive on solving the constant riddle of turning scattered ideas
						into a human reality.
					</p>
					<p>
						This site exists without constraints or requirements. It's a space to explore ideas,
						experiment freely, and build simply for the love of it.{' '}
						<em>It's my digital playground</em>.
					</p>
					<p>
						Away from the screen, I'm usually chasing good coffee, mountain air, and the perfect
						light, with indie rock turned up to eleven. Invite me on a roadtrip and we'll get along.
					</p>
				</div>
			</section>

			{blogPosts.length > 0 && (
				<section className="flex flex-col my-4 max-w-[65ch] w-full mx-auto">
					<h2 className="mb-6">Writing</h2>
					<PostList posts={blogPosts.slice(0, 3)} />

					{blogPosts.length > 3 && (
						<CustomLink
							href="/writing"
							className="text-sm ml-auto mt-4 text-foreground-tertiary hover:text-foreground decoration-dotted"
							aria-label="View more articles"
						>
							Read more
						</CustomLink>
					)}
				</section>
			)}

			{collections.length >= 3 && (
				<section className="flex flex-col max-w-[65ch] w-full mx-auto">
					<h2 className="mb-6">Photography</h2>

					<GalleryView as="collections" content={collections.slice(0, 3)} />

					<CustomLink
						href="/photography"
						className="text-sm ml-auto mt-4 text-foreground-tertiary hover:text-foreground decoration-dotted"
						aria-label="View more photography"
					>
						Visit gallery
					</CustomLink>
				</section>
			)}
		</>
	);
}
