import Divider from '@/components/blog/Divider';
import MDXComponents from '@/components/blog/MDXcomponents';
import { SectionHeader } from '@/components/layouts/Section';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import PostList from '@/components/ui/PostList';

import { SITE_NAME, SITE_URL } from '@/data/constants';
import { socialLinks } from '@/data/navigation';
import { getBlogPost, getBlogPosts, getRelatedPosts } from '@/lib/blog';
import { formatDate, slugify } from '@/lib/utils';
import avatar from '@/public/images/pixel.png';

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
	parent: ResolvingMetadata,
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
			canonical: `/writing/${post.slug}`,
		},
		openGraph: {
			title,
			description: summary,
			type: 'article',
			publishedTime: date.toISOString(),
			authors: ['Simon Nyström'],
			url: `${SITE_URL}/writing/${post.slug}`,
			images: [
				{
					url: `/api/ogBlog?title=${encodeURIComponent(title)}&image=${encodeURIComponent(
						image || '',
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
						image || '',
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
		url: `${SITE_URL}/writing/${post.slug}`,
		datePublished: post.date.toISOString(),
		dateModified: post.date.toISOString(),
		image: `${SITE_URL}/api/ogBlog?title=${encodeURIComponent(
			post.title,
		)}&image=${encodeURIComponent(post.image || '')}&tags=${encodeURIComponent(
			post.tags.slice(0, 3).join(','),
		)}`,
		author: {
			'@type': 'Person',
			name: SITE_NAME,
			url: SITE_URL,
		},
		publisher: {
			'@type': 'Organization',
			name: SITE_NAME,
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

			<article className="prose mx-auto w-full mt-4 sm:mt-20 first:prose-p:m-0">
				<div className="flex flex-col justify-end gap-2 mb-8">
					<div className="flex items-center gap-x-1 mb-2 text-sm text-foreground-tertiary">
						<Link
							href="/writing"
							className="text-foreground-tertiary hover:text-foreground transition-colors no-underline"
						>
							Writing
						</Link>
						<span aria-hidden="true">/</span>
						<Link
							href={`/writing/tag/${slugify(post.tags[0])}`}
							className="text-foreground-tertiary hover:text-foreground transition-colors no-underline"
						>
							{post.tags[0]}
						</Link>
					</div>
					<h1 className="not-prose text-foreground">{post.title}</h1>
					<time dateTime={post.date.toISOString()} className="font-serif text-foreground-tertiary">
						{formatDate(post.date, true)}
					</time>
				</div>

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
							className="size-12 rounded-full not-prose"
						/>
						<div className="absolute -right-0 -bottom-1 size-4 p-1 bg-background rounded-full flex items-center justify-center">
							<div className="size-full rounded-full bg-gradient-to-tl from-brand to-pink-100" />
						</div>
					</div>

					<div className="mr-auto">
						<span className="block text-sm text-foreground-tertiary">Have any questions?</span>
						<span className="block font-medium text-foreground leading-normal">
							Let&apos;s connect
						</span>
					</div>

					<div className="flex items-center gap-x-2">
						{socialLinks
							.filter((link) => link.name !== 'RSS')
							.map((link) => (
								<Button asChild variant="ghost" size="icon" key={link.name}>
									<a
										href={link.path}
										target="_blank"
										rel="noopener noreferrer"
										className="border shadow-inner cursor-pointer bg-background"
										aria-label={`Find me on ${link.name}`}
									>
										<Icon name={link.icon!} className={link.icon === 'x' ? 'size-4' : ''} />
									</a>
								</Button>
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
