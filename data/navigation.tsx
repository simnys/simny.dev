import { NavItem } from '../lib/types/types';
import { SITE_CONTACT, SITE_GITHUB_URL, SITE_LINKEDIN_URL } from './constants';

//
// NAVIGATION
//
export const navigationLinks: NavItem[] = [
	{
		name: 'Home',
		description: 'Who I am and what I do',
		path: '/',
		icon: 'home',
		rowSpan: 2,
	},
	{
		name: 'Writing',
		description: 'Thoughts, experiments & tutorials',
		path: '/writing',
		icon: 'blog',
		rowSpan: 2,
	},
	{
		name: 'Work',
		description: 'Professional and personal projects',
		path: '/work',
		icon: 'code',
		rowSpan: 2,
	},
	{
		name: 'Photography',
		description: 'Collections of my favorite images',
		path: '/photography',
		icon: 'gallery',
		rowSpan: 3,
	},
	{
		name: 'Now',
		description: 'Current endeavors',
		path: '/now',
		icon: 'calendar',
		rowSpan: 3,
	},
];
export const socialLinks: NavItem[] = [
	{
		name: 'Github',
		path: SITE_GITHUB_URL,
		icon: 'github',
	},
	{
		name: 'LinkedIn',
		path: SITE_LINKEDIN_URL,
		icon: 'linkedin',
	},
	{
		name: 'RSS',
		path: '/rss.xml',
		icon: 'rss',
	},
	{
		name: 'Email',
		path: `mailto:${SITE_CONTACT}`,
		icon: 'email',
	},
];

export const links = [...navigationLinks, ...socialLinks];
