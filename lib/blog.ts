import { allPosts, Post } from 'content-collections';
import { cache } from 'react';

export const getBlogPosts = cache(() => {
	const posts = allPosts
		.filter((post) => !post.draft)
		.toSorted((a, b) => b.date.getTime() - a.date.getTime());
	return posts;
});

export const getBlogPost = (slug: string) => {
	return allPosts.find((post) => post.slug === slug && !post.draft);
};

export const getLatestBlogPost = () => {
	const posts = getBlogPosts();

	if (!posts) return null;
	return posts[0];
};

export const getRelatedPosts = (post: Post) => {
	const posts = getBlogPosts();
	let related = posts
		.filter((p) => p.slug !== post.slug)
		.filter((p) => p.tags?.some((tag: string) => post.tags?.includes(tag)));

	if (related.length < 3) {
		const additional = posts
			.filter((p) => p.slug !== post.slug && !related.includes(p))
			.slice(0, 3 - related.length);
		related = related.concat(additional);
	}

	return related.slice(0, 3);
};

// TAGS
export const getPostsByTag = (tag: string) => {
	const posts = getBlogPosts();
	const postsByTag = posts.filter((p) =>
		p.tags?.some((t: string) => tag.toLowerCase() === t.toLowerCase()),
	);
	return postsByTag;
};

export const getAllTags = () => {
	// Extract tags from each post and flatten (take 12)
	const tags = allPosts.flatMap((post) => post.tags ?? []);
	// Ensure uniqueness of tags with Set and sort alphabetically
	return Array.from(new Set(tags)).sort((a, b) => a.localeCompare(b));
};
