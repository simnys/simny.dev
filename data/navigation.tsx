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
		iconActive: 'homeSolid',
		rowSpan: 2,
	},
	{
		name: 'Writing',
		description: 'Thoughts, experiments & tutorials',
		path: '/writing',
		icon: 'book',
		iconActive: 'bookSolid',
		rowSpan: 2,
	},
	{
		name: 'Work',
		description: 'Professional and personal projects',
		path: '/work',
		icon: 'code',
		iconActive: 'codeSolid',
		rowSpan: 2,
	},
	{
		name: 'Photography',
		description: 'Collections of my favorite images',
		path: '/photography',
		icon: 'gallery',
		iconActive: 'gallerySolid',
		rowSpan: 3,
	},
	{
		name: 'Now',
		description: 'Current endeavors',
		path: '/now',
		icon: 'calendar',
		iconActive: 'calendarSolid',
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
		name: 'Email',
		path: `mailto:${SITE_CONTACT}`,
		icon: 'email',
	},
	{
		name: 'RSS',
		path: '/rss',
		icon: 'rss',
	},
];

export const links = [...navigationLinks, ...socialLinks];
