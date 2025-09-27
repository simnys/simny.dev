import { Navigation } from '../lib/types';
import { SITE_CONTACT, SITE_GITHUB_URL, SITE_INSTAGRAM_URL, SITE_LINKEDIN_URL } from './constants';
import {
	IconComponent,
	IconDesign,
	IconDocument,
	IconGallery,
	IconGithub,
	IconInstagram,
	IconLinkedin,
	IconRSS,
} from './icons';

//
// NAVIGAITON
//
const navigationLinks = [
	{
		name: 'Home',
		path: '/',
	},
	{
		name: 'About',
		path: '/about',
	},
	{
		name: 'Blog',
		path: '/blog',
	},
	{
		name: 'Projects',
		path: '/projects',
	},
];
const exploreLinks = [
	{
		name: 'Gallery',
		description: 'Memorable photography collections from around the globe',
		path: '/gallery',
		icon: IconGallery,
		colSpan: 7,
		rowSpan: 4,
	},
	{
		name: 'Components',
		description: 'Library of interactive elements',
		path: '',
		icon: IconComponent,
		colSpan: 5,
		rowSpan: 2,
	},
	{
		name: 'Colophon',
		description: 'Dev & design process',
		path: '/colophon',
		icon: IconDesign,
		colSpan: 5,
		rowSpan: 1,
	},
];
const connectLinks = [
	{
		name: 'Contact',
		path: `mailto:${SITE_CONTACT}`,
		icon: undefined,
		colSpan: 5,
		rowSpan: 2,
	},
	{
		name: 'Resume',
		description: 'Summary of my experiences',
		path: '/cv.pdf',
		icon: IconDocument,
		colSpan: 5,
		rowSpan: 1,
	},
];
const socialLinks = [
	{
		name: 'Github',
		path: SITE_GITHUB_URL,
		icon: IconGithub,
	},
	{
		name: 'LinkedIn',
		path: SITE_LINKEDIN_URL,
		icon: IconLinkedin,
	},
	{
		name: 'Instagram',
		path: SITE_INSTAGRAM_URL,
		icon: IconInstagram,
	},
	{
		name: 'RSS',
		path: '/rss.xml',
		icon: IconRSS,
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
