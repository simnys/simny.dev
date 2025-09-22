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
import { getLimitedImages } from '@/lib/gallery';
import { cn, formatDate } from '@/lib/utils';

import { Metadata } from 'next';

export const metadata: Metadata = {
	alternates: {
		canonical: SITE_URL,
	},
};

export default async function Home() {
	const galleryImages = await getLimitedImages(4);
	const blogPosts = getBlogPosts();
	const latestPost = getLatestBlogPost();

	return (
		<main className="grow">
			<Section className="pt-40 space-y-8 text-center relative">
				<Hero />
				<div
					className={cn(
						'absolute inset-0 pointer-events-none -z-10 m-0',
						'bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:60px_60px]',
						'dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px]'
					)}
					style={{
						WebkitMaskImage: 'radial-gradient(circle at 50% 50%, white 50%, transparent 100%)',
						maskImage: 'radial-gradient(circle at 50% 50%, white 50%, transparent 100%)',
					}}
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-brand/5 via-transparent to-transparent via-30% pointer-events-none" />
			</Section>

			<Section>
				<BentoGrid>
					<BentoCardAbout />
					<BentoCardGallery images={galleryImages} />
					<BentoCardProjects />
					{latestPost && <BentoCardBlog latestPost={latestPost} />}
				</BentoGrid>
			</Section>

			<Section>
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
			</Section>
		</main>
	);
}
