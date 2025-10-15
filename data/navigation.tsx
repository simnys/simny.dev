import { Navigation, NavItem } from '../lib/types/types';
import {
	SITE_CONTACT,
	SITE_GITHUB_URL,
	SITE_INSTAGRAM_URL,
	SITE_LINKEDIN_URL,
	SITE_X_URL,
} from './constants';

//
// NAVIGAITON
//
const navigationLinks: NavItem[] = [
	{
		name: 'Home',
		path: '/',
		icon: 'home',
	},
	{
		name: 'About',
		path: '/about',
		icon: 'user',
	},
	{
		name: 'Blog',
		path: '/blog',
		icon: 'blog',
	},
	{
		name: 'Projects',
		path: '/projects',
		icon: 'code',
	},
];
const exploreLinks: NavItem[] = [
	{
		name: 'Gallery',
		description: 'Memorable photography collections from around the globe',
		path: '/gallery',
		icon: 'gallery',
		colSpan: 7,
		rowSpan: 4,
	},
	{
		name: 'Components',
		description: 'Library of interactive elements',
		path: '',
		icon: 'component',
		colSpan: 5,
		rowSpan: 2,
	},
	{
		name: 'Colophon',
		description: 'Dev & design process',
		path: '/colophon',
		icon: 'design',
		colSpan: 5,
		rowSpan: 1,
	},
	{
		name: 'Now',
		description: 'Memorable photography collections from around the globe',
		path: '/now',
		icon: 'calendar',
		colSpan: 5,
		rowSpan: 2,
	},
];
const connectLinks: NavItem[] = [
	{
		name: 'Contact',
		path: `mailto:${SITE_CONTACT}`,
		icon: 'chat',
		colSpan: 5,
		rowSpan: 2,
	},
	{
		name: 'Resume',
		description: 'Summary of my experiences',
		path: '/cv.pdf',
		icon: 'document',
		colSpan: 7,
		rowSpan: 1,
	},
];
const socialLinks: NavItem[] = [
	{
		name: 'Github',
		path: SITE_GITHUB_URL,
		icon: 'github',
	},
	{
		name: 'X',
		path: SITE_X_URL,
		icon: 'x',
	},
	{
		name: 'LinkedIn',
		path: SITE_LINKEDIN_URL,
		icon: 'linkedin',
	},
	{
		name: 'Instagram',
		path: SITE_INSTAGRAM_URL,
		icon: 'instagram',
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

export const navItems: Navigation = {
	navigationLinks,
	exploreLinks,
	connectLinks,
	socialLinks,
} as const;
export const links = [...navigationLinks, ...exploreLinks, connectLinks, ...socialLinks];
export const dropdownLinks = [...exploreLinks, connectLinks[1]];
