import PageHeader from '@/components/layouts/PageHeader';
import { Icon } from '@/components/ui/Icon';
import PostList from '@/components/ui/PostList';
import { TagSelector } from '@/components/ui/TagSelector';
import { SITE_NAME, SITE_URL } from '@/data/constants';

import { getAllTags, getBlogPosts } from '@/lib/blog';

import { Metadata } from 'next';
import Script from 'next/script';
import { Blog as BlogLeaf, WithContext } from 'schema-dts';

export const metadata: Metadata = {
	title: 'Blog',
	description: 'Insights, tutorials, and ideas from my journey in tech.',
};

export default async function Blog() {
	const posts = getBlogPosts();
	const tags = getAllTags();

	const jsonLd: WithContext<BlogLeaf> = {
		'@type': 'Blog',
		'@context': 'https://schema.org',
		name: `${SITE_NAME} Blog`,
		description: metadata.description || '',
		url: `${SITE_URL}/blog`,
		publisher: {
			'@type': 'Person',
			name: SITE_NAME,
			url: SITE_URL,
		},
		hasPart: posts.slice(0, 5).map((post) => ({
			'@type': 'BlogPosting',
			headline: post.title,
			description: post.summary,
			url: `${SITE_URL}/blog/${post.slug}`,
		})),
	};

	return (
		<>
			<Script
				type="application/ld+json"
				id="blog_jsonLd"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>

			<PageHeader title="Blog" content="Insights, tutorials, and ideas from my journey in tech." />

			<section className="space-y-4 sm:space-y-6">
				{tags.length > 4 && <TagSelector tags={tags} activeTag={''} />}
				{posts.length > 0 ? (
					<PostList posts={posts} />
				) : (
					<div className="flex flex-col gap-4 py-10 items-center justify-center">
					<Icon name="warning" className="size-8 text-brand" />
								<p className="text-foreground-secondary mb-4 text-center">
									No posts found. The blog is still under construction. <br className="hidden sm:block" />
									Please check back later!
								</p>
					</div>
				)}
			</section>
		</>
	);
}
