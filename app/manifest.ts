import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME, SITE_TITLE } from '@/data/constants';
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: SITE_TITLE,
		short_name: SITE_NAME,
		description: SITE_DESCRIPTION,
		start_url: '/',
		display: 'standalone',
		background_color: '#0f0f0f',
		theme_color: '#fafafa',
		icons: [
			{
				src: '/favicon.ico',
				sizes: 'any',
				type: 'image/x-icon',
			},
		],
		categories: SITE_KEYWORDS,
		orientation: 'portrait',
		prefer_related_applications: false,
		shortcuts: [
			{
				name: 'Blog',
				url: '/blog',
				description: 'Read latest front-end engineering articles',
			},
			{
				name: 'Work',
				url: '/work',
				description: 'View technical work projects and experiments',
			},
			{
				name: 'Photo Gallery',
				url: '/gallery',
				description: 'Browse my photography portfolio',
			},
			{
				name: 'Now',
				url: '/now',
				description: 'View my current endeavors and activities',
			},
		],
		id: '/',
		scope: '/',
		lang: 'en',
		dir: 'ltr',
	};
}
