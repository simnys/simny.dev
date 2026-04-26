import { allPosts } from '@/.content-collections/generated';
import { SITE_URL } from '@/data/constants';
import { galleryCollections } from '@/data/gallery';
import { getAllTags } from '@/lib/blog';
import { slugify } from '@/lib/utils';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	const posts: MetadataRoute.Sitemap = allPosts.map((post) => ({
		url: `${SITE_URL}/writing/${post.slug}`,
		lastModified: post.date.toISOString().split('T')[0],
	}));

	const routes: MetadataRoute.Sitemap = [
		'',
		'/writing',
		'/photography',
		'/work',
		'/now',
		...getAllTags().map((tag) => `/writing/tag/${slugify(tag)}`),
		...galleryCollections.map((collection) => `/photography/${slugify(collection.title)}`),
	].map((route) => ({
		url: `${SITE_URL}${route}`,
		lastModified: new Date().toISOString().split('T')[0],
	}));

	return [...routes, ...posts];
}
