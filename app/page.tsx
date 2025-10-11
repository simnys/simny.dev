import CustomLink from '@/components/blog/Link';
import { Section, SectionHeader } from '@/components/layouts/Section';
import {
	BentoCardAbout,
	BentoCardBlog,
	BentoCardGallery,
	BentoCardProjects,
} from '@/components/sections/BentoCards';
import Hero from '@/components/sections/Hero';
import { BentoGrid } from '@/components/ui/Bento';
import { Card, CardBody, CardFooter } from '@/components/ui/Card';

import { SITE_URL } from '@/data/constants';
import { IconDocument } from '@/data/icons';
import { getBlogPosts, getLatestBlogPost } from '@/lib/blog';
import { cn, formatDate } from '@/lib/utils';

import { Metadata } from 'next';

export const metadata: Metadata = {
	alternates: {
		canonical: SITE_URL,
	},
};

export default async function Home() {
	const blogPosts = getBlogPosts();
	const latestPost = getLatestBlogPost();

	return (
		<>
			<section className="text-center flex flex-col gap-12 items-center justify-center relative -mx-6 py-22 border-b">
				<Hero />
				<div
					className={cn(
						'absolute inset-0 pointer-events-none m-0',
						'bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:60px_60px]',
						'dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px]'
					)}
					style={{
						WebkitMaskImage: 'radial-gradient(circle at 50% 50%, white 50%, transparent 100%)',
						maskImage: 'radial-gradient(circle at 50% 50%, white 50%, transparent 100%)',
					}}
				/>
				{/* <div className="absolute inset-0 bg-gradient-to-b from-brand/5 via-transparent to-transparent via-30% pointer-events-none" /> */}
			</section>

			<section className="prose mx-auto">
				<h2 className="">About</h2>
				<div className="">
					{content.map((c, i) => (
						<p key={i}>{c.text}</p>
					))}
				</div>
			</section>

			{/* <Section>
				<BentoGrid>
					<BentoCardAbout />
					<BentoCardGallery />
					<BentoCardProjects />
					{latestPost && <BentoCardBlog latestPost={latestPost} />}
				</BentoGrid>
			</Section> */}

			{/* <section>
				<SectionHeader title="Latest Blog Posts" subtitle="Blog" linkHref="/blog" />

				<div className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-4 px-2">
					{blogPosts.slice(0, 2).map((post, idx) => (
						<Card
							key={post.slug}
							href={`/blog/${post.slug}`}
							image={post.image}
							imageMeta={post.imageMeta}
							className="h-[220px] sm:h-[180px]"
						>
							<CardBody title={post.title} icon={IconDocument} className="line-clamp-1 text-base">
								{post.summary}
							</CardBody>
							<CardFooter>
								<time className="text-foreground-tertiary">{formatDate(post.date, true)}</time>
								<span className="text-foreground-tertiary">·</span>
								<p className="text-foreground-tertiary">{post.readingTime}</p>
							</CardFooter>
						</Card>
					))}
				</div>
			</section> */}
		</>
	);
}

const content = [
	{
		heading: 'Overview',
		text: (
			<>
				This site is all about being fast, accessible, and easy on the eyes. I built and designed it
				myself, focusing on clean code, smooth layouts, and a user experience that just feels right.
				Everything is meant to be modern, simple, and a breeze to use.
			</>
		),
	},
	{
		heading: 'Technologies',
		text: (
			<>
				Under the hood, it runs on <CustomLink href="https://nextjs.org">Next.js</CustomLink> (App
				Router), <CustomLink href="https://react.dev">React</CustomLink>, and{' '}
				<CustomLink href="https://typescriptlang.org">TypeScript</CustomLink>. Styling is handled
				with <CustomLink href="https://tailwindcss.com">Tailwind CSS</CustomLink> and a few custom
				utilities. Most content is static for speed, but there are dynamic bits powered by server
				components and edge functions.
			</>
		),
	},
	{
		heading: 'Design & Colors',
		text: (
			<>
				The vibe I&apos;m going for is minimal, with neutral colors and blue accents to keep things
				fresh.{' '}
				<CustomLink href="https://www.fontshare.com/?q=General%20Sans">General Sans</CustomLink> and{' '}
				<CustomLink href={'https://vercel.com/font'}>Geist Mono</CustomLink> handle the typography,
				making everything readable and stylish. Layouts are flexible and responsive, with plenty of
				space and a grid to keep things tidy.
			</>
		),
	},
	{
		heading: 'Inspirations',
		text: (
			<>
				I&apos;ve taken cues from the design systems of{' '}
				<CustomLink href="https://tailwindcss.com">Tailwind CSS</CustomLink> and{' '}
				<CustomLink href="https://vercel.com">Vercel</CustomLink>. Some developer portfolios that
				also influenced my own approach are{' '}
				<CustomLink href="https://braydoncoyer.dev">Braydon Coyer</CustomLink>,{' '}
				<CustomLink href="https://maximeheckel.com">Maxime Heckel</CustomLink>, and{' '}
				<CustomLink href="https://jakub.kr">Jakub Krehel</CustomLink>. Go give them a visit, they
				have killer sites!
			</>
		),
	},
];
