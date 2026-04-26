import PageHeader from '@/components/layouts/PageHeader';
import PostList from '@/components/ui/PostList';
import { TagSelector } from '@/components/ui/TagSelector';

import { SITE_URL } from '@/data/constants';
import { getAllTags, getPostsByTag } from '@/lib/blog';
import { slugify } from '@/lib/utils';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
	params: Promise<{
		slug: string;
	}>;
}

export async function generateMetadata(props: Props): Promise<Metadata | undefined> {
	const params = await props.params;
	const tag = getAllTags().find((t) => slugify(t) == params.slug);
	if (!tag) return;

	const title = 'Writing - ' + tag;
	const description = `Articles and tutorials I've written about ${tag}`;
	const url = `${SITE_URL}/writing/tag/${params.slug}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			url,
		},
		twitter: {
			title,
			description,
		},
	};
}

export default async function TagPage(props: Props) {
	const params = await props.params;
	const tags = getAllTags();
	const tag = tags.find((t) => slugify(t) == params.slug);
	if (!tag) return notFound();

	const posts = getPostsByTag(tag);

	return (
		<>
			<PageHeader title={tag} content="Insights, tutorials, and ideas from my journey in tech." />

			<section className="space-y-4 sm:space-y-6">
				<TagSelector tags={tags} activeTag={tag} />
				<PostList posts={posts} />
			</section>
		</>
	);
}

export async function generateStaticParams() {
	const uniqueTags = getAllTags();
	return uniqueTags.map((tag) => ({ slug: slugify(tag) }));
}
