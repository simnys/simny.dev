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
		categories: SITE_KEYWORDS,
		orientation: 'portrait',
		prefer_related_applications: false,
		shortcuts: [
			{
				name: 'About',
				url: '/',
				description: 'Learn more about me',
			},
			{
				name: 'Writing',
				url: '/writing',
				description: 'Read latest web & design engineering articles',
			},
			{
				name: 'Work',
				url: '/work',
				description: 'View technical work projects and experiments',
			},
			{
				name: 'Photography',
				url: '/photography',
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
