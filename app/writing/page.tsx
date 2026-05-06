import CustomLink from '@/components/blog/Link';
import PageHeader from '@/components/layouts/PageHeader';
import StructuredData from '@/components/seo/StructuredData';
import { Icon } from '@/components/ui/Icon';
import PostList from '@/components/ui/PostList';
import { SITE_NAME, SITE_URL } from '@/data/constants';

import { getBlogPosts } from '@/lib/blog';
import { buildPageMetadata } from '@/lib/metadata';

import { Metadata, ResolvingMetadata } from 'next';
import { Blog as BlogLeaf, WithContext } from 'schema-dts';

const title = 'Writing';
const description = 'Thoughts, experiments and ideas.';

export async function generateMetadata(
	_parent: unknown,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	return buildPageMetadata(
		{
			title,
			description,
			canonical: '/writing',
		},
		parent,
	);
}

export default async function Writing() {
	const posts = getBlogPosts();

	const jsonLd: WithContext<BlogLeaf> = {
		'@type': 'Blog',
		'@context': 'https://schema.org',
		name: `${SITE_NAME} - ${title}`,
		description,
		url: `${SITE_URL}/writing`,
		publisher: {
			'@type': 'Person',
			name: SITE_NAME,
			url: SITE_URL,
		},
		hasPart: posts.slice(0, 5).map((post) => ({
			'@type': 'BlogPosting',
			headline: post.title,
			description: post.summary,
			url: `${SITE_URL}/writing/${post.slug}`,
		})),
	};

	return (
		<>
			<StructuredData id="blog_jsonLd" data={jsonLd} />

			<PageHeader title={title} content={description} />

			{posts.length >= 3 && (
				<CustomLink
					href="/rss.xml"
					aria-label="Subscribe to RSS feed"
					variant="secondary"
					className="absolute right-6 p-1 top-25.5 sm:top-33"
					icon="rss"
				>
					Feed
				</CustomLink>
			)}

			<section className="space-y-4 sm:space-y-6">
				{posts.length > 0 ? (
					<PostList posts={posts} />
				) : (
					<div className="flex flex-col gap-4 py-10 items-center justify-center">
						<Icon name="warning" className="size-8 text-brand" />
						<p className="text-foreground-secondary mb-4 text-center">
							No posts found.
							<br />
							Please check back later!
						</p>
					</div>
				)}
			</section>
		</>
	);
}
