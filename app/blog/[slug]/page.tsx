import Divider from '@/components/blog/Divider';
import MDXComponents from '@/components/blog/MDXcomponents';
import Tag from '@/components/blog/Tag';
import { SectionHeader } from '@/components/layouts/Section';
import { Icon } from '@/components/ui/Icon';
import PostList from '@/components/ui/PostList';

import { SITE_NAME, SITE_URL } from '@/data/constants';
import { navItems } from '@/data/navigation';
import { getBlogPost, getBlogPosts, getRelatedPosts } from '@/lib/blog';
import { cn, formatDate } from '@/lib/utils';
import avatar from '@/public/images/avatar-px.png';

import { MDXContent } from '@content-collections/mdx/react';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { BlogPosting, WithContext } from 'schema-dts';

interface Props {
	params: Promise<{
		slug: string;
	}>;
}

export async function generateMetadata(
	props: Props,
	parent: ResolvingMetadata
): Promise<Metadata | undefined> {
	const params = await props.params;
	const post = getBlogPost(params.slug);
	if (!post) {
		return;
	}

	const { title, summary, date, image } = post;
	const previousImages = (await parent)?.openGraph?.images || [];

	return {
		title,
		description: summary,
		alternates: {
			canonical: `/blog/${post.slug}`,
		},
		openGraph: {
			title,
			description: summary,
			type: 'article',
			publishedTime: date.toISOString(),
			authors: ['Simon Nyström'],
			url: `${SITE_URL}/blog/${post.slug}`,
			images: [
				{
					url: `/api/ogBlog?title=${encodeURIComponent(title)}&image=${encodeURIComponent(
						image || ''
					)}&tags=${encodeURIComponent(post.tags.slice(0, 3).join(','))}`,
					width: 1200,
					height: 630,
					alt: title,
					type: 'image/png',
				},
				...previousImages,
			],
		},
		twitter: {
			title,
			description: summary,
			card: 'summary_large_image',
			images: [
				{
					url: `/api/ogBlog?title=${encodeURIComponent(title)}&image=${encodeURIComponent(
						image || ''
					)}&tags=${encodeURIComponent(post.tags.slice(0, 3).join(','))}`,
					width: 1200,
					height: 630,
					alt: title,
				},
				...previousImages,
			],
		},
	};
}

export default async function BlogPost(props: Props) {
	const params = await props.params;
	const post = getBlogPost(params.slug);
	if (!post) return notFound();

	const related = getRelatedPosts(post);

	const jsonLd: WithContext<BlogPosting> = {
		'@type': 'BlogPosting',
		'@context': 'https://schema.org',
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `${SITE_URL}`,
		},
		headline: post.title,
		description: post.summary,
		keywords: post.tags.join(', '),
		url: `${SITE_URL}/blog/${post.slug}`,
		datePublished: post.date.toISOString(),
		dateModified: post.date.toISOString(),
		image: `${SITE_URL}/api/ogBlog?title=${encodeURIComponent(
			post.title
		)}&image=${encodeURIComponent(post.image || '')}&tags=${encodeURIComponent(
			post.tags.slice(0, 3).join(',')
		)}`,
		author: {
			'@type': 'Person',
			name: SITE_NAME,
			url: SITE_URL,
		},
		publisher: {
			'@type': 'Organization',
			name: SITE_NAME,
			logo: {
				'@type': 'ImageObject',
				url: `${SITE_URL}/favicon.ico`,
			},
		},
		isAccessibleForFree: true,
	};

	return (
		<>
			<Script
				type="application/ld+json"
				id={`${post.slug}_jsonLd`}
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>

			<div className="hidden sm:block">
				<Link
					href="/blog"
					className="absolute md:top-6 md:left-6 w-fit p-2 rounded-full bg-foreground-tertiary/5 text-foreground-secondary ring-1 ring-transparent ring-offset-background transition-all hover:bg-foreground-tertiary/10 hover:text-foreground hover:ring-brand hover:ring-offset-2"
				>
					<Icon name="back" className="-rotate-90" />
				</Link>
			</div>

			<section className="-mx-6 px-2">
				<div className="relative">
					{/* LINES */}
					<span className="absolute top-6 z-10 h-px w-full bg-zinc-500/75 mix-blend-screen md:top-12" />
					<span className="absolute bottom-6 z-10 h-px w-full bg-zinc-500/75 mix-blend-screen md:bottom-12" />
					<span className="absolute left-6 z-10 h-full w-px bg-zinc-500/75 mix-blend-screen md:left-12" />
					<span className="absolute right-6 z-10 h-full w-px bg-zinc-500/75 mix-blend-screen md:right-12" />

					{/* CROSSES */}
					<span className="absolute left-4 md:left-[40.5px] top-6 md:top-12 z-20 h-px w-4 bg-white md:block" />
					<span className="absolute left-6 md:left-[48px] top-4 md:top-[40.5px] z-20 h-4 w-px bg-white md:block" />

					<span className="absolute right-4 md:right-[40.5px] top-6 md:top-12 z-20 h-px w-4 bg-white md:block" />
					<span className="absolute right-6 md:right-[48px] top-4 md:top-[40.5px] z-20 h-4 w-px bg-white md:block" />

					<span className="absolute bottom-6 md:bottom-12 left-4 md:left-[40.5px] z-20 h-px w-4 bg-white md:block" />
					<span className="absolute bottom-4 md:bottom-[40.5px] left-6 md:left-[48px] z-20 h-4 w-px bg-white md:block" />

					<span className="absolute bottom-6 md:bottom-12 right-4 md:right-[40.5px] z-20 h-px w-4 bg-white md:block" />
					<span className="absolute bottom-4 md:bottom-[40.5px] right-6 md:right-[48px] z-20 h-4 w-px bg-white md:block" />

					<div
						className="h-[420px] bg-foreground dark:bg-background flex flex-col gap-4 sm:gap-2 justify-end p-8 pb-10 md:p-16 rounded-2xl md:rounded-3xl bg-no-repeat bg-cover bg-center ring-1 ring-border text-background dark:text-foreground"
						style={{
							backgroundImage: `linear-gradient(to top, rgba(38,99,242, 0.5) 0%, rgba(19,49,121, 0.5) 30%, transparent 60%), url(${
								post.image ?? ''
							})`,
						}}
					>
						<ul className="hidden w-fit sm:flex items-center gap-4 flex-wrap pb-2">
							{post.tags?.map((tag, idx) => (
								<Tag
									key={idx}
									tag={tag}
									className="backdrop-blur-md text-background dark:text-foreground bg-background/10 dark:bg-foreground/10 hover:bg-background hover:text-foreground dark:hover:bg-foreground dark:hover:text-background"
								/>
							))}
						</ul>
						<h1 className="text-2xl sm:text-3xl text-balance">{post.title}</h1>
						<div className="font-mono flex items-center gap-4 sm:gap-6 opacity-80">
							<div className="flex items-center gap-x-1 sm:gap-x-2">
								<Icon name="calendar" className="w-3 h-3 sm:w-4 sm:h-4" />
								<time>{formatDate(post.date)}</time>
							</div>
							<div className="flex items-center gap-x-1 sm:gap-x-2">
								<Icon name="hourglass" className="w-3 h-3 sm:w-4 sm:h-4" />
								<p>{post.readingTime}</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<article className="prose mx-auto w-full first:prose-p:m-0">
				<MDXContent code={post.body} components={MDXComponents} />

				<Divider />

				<div className="flex items-center gap-4 flex-wrap p-4 sm:px-8 sm:py-6 bg-background-secondary rounded-xl border shadow-xs">
					<div className="relative shrink-0">
						<Image
							width={64}
							height={64}
							src={avatar}
							alt=""
							draggable={false}
							className="size-12 rounded-2xl not-prose"
						/>
						<div className="absolute -right-1 -bottom-1 size-4 p-1 bg-background rounded-full flex items-center justify-center">
							<div className="size-full rounded-full bg-brand" />
						</div>
					</div>

					<div className="mr-auto">
						<span className="block font-mono tracking-tighter text-foreground-tertiary">
							Have any questions?
						</span>
						<span className="block font-medium text-foreground leading-normal">
							Let&apos;s connect
						</span>
					</div>

					<div className="flex items-center gap-x-2">
						{navItems.socialLinks
							.filter((link) => link.name !== 'RSS')
							.map((link) => (
								<a
									key={link.name}
									href={link.path}
									target="_blank"
									rel="noopener noreferrer"
									className={cn(
										'relative size-10 flex items-center justify-center rounded-lg text-foreground-tertiary border shadow-inner cursor-pointer',
										'transition-all duration-200 ease-out hover:text-foreground active:scale-97'
									)}
									aria-label={`Find me on ${link.name}`}
								>
									<Icon name={link.icon!} className={link.icon === 'x' ? 'size-4' : ''} />
								</a>
							))}
					</div>
				</div>
			</article>

			{related.length > 0 && (
				<section className="max-w-[65ch] w-full mx-auto">
					<SectionHeader title="Related Articles" subtitle="You might also like" />
					<PostList posts={related.slice(0, 3)} />
				</section>
			)}
		</>
	);
}

export async function generateStaticParams() {
	const posts = getBlogPosts();
	return posts.map((post) => ({ slug: post.slug }));
}
