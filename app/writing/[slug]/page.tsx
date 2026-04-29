import Divider from '@/components/blog/Divider';
import CustomLink from '@/components/blog/Link';
import MDXComponents from '@/components/blog/MDXcomponents';
import PageHeader from '@/components/layouts/PageHeader';
import { SectionHeader } from '@/components/layouts/Section';
import StructuredData from '@/components/seo/StructuredData';
import { Button } from '@/components/ui/Button';
import Copy from '@/components/ui/Copy';
import { Icon } from '@/components/ui/Icon';
import PostList from '@/components/ui/PostList';

import { SITE_NAME, SITE_URL } from '@/data/constants';
import { socialLinks } from '@/data/navigation';
import { getBlogPost, getBlogPosts, getRelatedPosts } from '@/lib/blog';
import { formatDate } from '@/lib/utils';
import avatar from '@/public/images/pixel.png';

import { MDXContent } from '@content-collections/mdx/react';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
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
					)}`,
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
					)}`,
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
			'@id': `${SITE_URL}/writing/${post.slug}`,
		},
		headline: post.title,
		description: post.summary,
		keywords: post.tags?.join(', '),
		url: `${SITE_URL}/writing/${post.slug}`,
		datePublished: post.date.toISOString(),
		dateModified: post.date.toISOString(),
		image: `${SITE_URL}/api/ogBlog?title=${encodeURIComponent(
			post.title,
		)}&image=${encodeURIComponent(post.image || '')}`,
		author: {
			'@type': 'Person',
			name: SITE_NAME,
			url: SITE_URL,
		},
		publisher: {
			'@type': 'Person',
			name: SITE_NAME,
			url: SITE_URL,
		},
		isAccessibleForFree: true,
	};

	return (
		<>
			<StructuredData id={`${post.slug}_jsonLd`} data={jsonLd} />

			<article className="prose mx-auto w-full first:prose-p:mt-0">
				<PageHeader
					title={post.title}
					backlink="/writing"
					className="not-prose text-foreground"
					backlinkClassName="md:left-12"
				/>
				<time
					dateTime={post.date.toISOString()}
					className="block mt-1 mb-8 font-serif text-foreground-secondary text-sm"
				>
					{formatDate(post.date, true)}
				</time>

				<Button
					asChild
					variant="secondary"
					size="icon"
					className="absolute right-3 top-4 sm:top-10"
				>
					<Copy
						aria-label="Back to writing overview"
						toCopy={`${SITE_URL}/writing/${post.slug}`}
						successMessage={<Icon name="check" />}
					>
						<Icon name="link" />
					</Copy>
				</Button>

				<MDXContent code={post.content} components={MDXComponents} />
				<Divider />

				<div className="flex items-center gap-4 flex-wrap p-4 sm:px-8 sm:py-6 bg-background-secondary rounded-xl border shadow-xs">
					<div className="relative shrink-0">
						<Image
							width={64}
							height={64}
							src={avatar}
							alt="simon nyström avatar"
							draggable={false}
							className="size-12 rounded-full not-prose"
						/>
						<div className="absolute -right-1 -bottom-1 size-4 p-1 bg-background rounded-full flex items-center justify-center">
							<div className="size-full rounded-full bg-linear-to-tl from-brand to-pink-100" />
						</div>
					</div>

					<div className="mr-auto">
						<span className="block text-sm text-foreground-tertiary">Have any questions?</span>
						<span className="block font-medium text-foreground leading-normal">
							Let&apos;s connect
						</span>
					</div>

					<div className="flex items-center gap-x-2">
						{socialLinks.map((link) => (
							<Button asChild variant="ghost" size="icon" key={link.name}>
								<a
									href={link.path}
									target="_blank"
									rel="noopener"
									className="border border-border"
									aria-label={`Find me on ${link.name}`}
								>
									<Icon name={link.icon!} />
								</a>
							</Button>
						))}
					</div>
				</div>
			</article>

			{related.length > 0 && (
				<section className="max-w-[65ch] w-full mx-auto flex flex-col">
					<SectionHeader title="More" />
					<PostList posts={related.slice(0, 3)} />
					{related.length > 3 && (
						<CustomLink
							href="/writing"
							className="text-sm ml-auto mt-4 text-foreground-tertiary hover:text-foreground decoration-dotted"
							aria-label="View all articles"
						>
							View all
						</CustomLink>
					)}
				</section>
			)}
		</>
	);
}

export async function generateStaticParams() {
	const posts = getBlogPosts();
	return posts.map((post) => ({ slug: post.slug }));
}
