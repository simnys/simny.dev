import { allPosts } from 'content-collections';
import { SITE_URL } from '@/data/constants';
import { galleryCollections } from '@/data/gallery';
import { slugify } from '@/lib/utils';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	const posts: MetadataRoute.Sitemap = allPosts.map((post) => ({
		url: `${SITE_URL}/writing/${post.slug}`,
		lastModified: post.date.toISOString().split('T')[0],
		changeFrequency: 'monthly',
		priority: 0.7,
	}));

	const staticRoutes: Array<[string, MetadataRoute.Sitemap[number]['changeFrequency'], number]> = [
		['', 'weekly', 1.0],
		['/writing', 'weekly', 0.8],
		['/photography', 'monthly', 0.8],
		['/work', 'monthly', 0.7],
		['/now', 'weekly', 0.6],
	];

	const collectionRoutes: MetadataRoute.Sitemap = galleryCollections.map((collection) => ({
		url: `${SITE_URL}/photography/${slugify(collection.title)}`,
		lastModified: new Date().toISOString().split('T')[0],
		changeFrequency: 'monthly',
		priority: 0.6,
	}));

	const routes: MetadataRoute.Sitemap = staticRoutes.map(([route, changeFrequency, priority]) => ({
		url: `${SITE_URL}${route}`,
		lastModified: new Date().toISOString().split('T')[0],
		changeFrequency,
		priority,
	}));

	return [...routes, ...collectionRoutes, ...posts];
}
