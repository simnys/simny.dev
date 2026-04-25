import { Project } from '@/lib/types/types';
import { SITE_GITHUB_URL } from './constants';

export const technologies = [
	'HTML',
	'CSS',
	'JavaScript',
	'TypeScript',
	'React',
	'Next.js',
	'Node',
	'Git',
	'Tailwind',
	'Prisma',
	'MongoDB',
	'GraphQL',
	'Express',
	'Postgres',
	'Supabase',
	'Java',
	'C#',
	'.NET',
	'Framer Motion',
	'Contentful',
	'Optimizely',
	'Docker',
] as const;
export type Technology = (typeof technologies)[number];

export const professionalProjects = [
	{
		title: 'Swedish Engineers',
		date: '2023 - Present',
		description:
			'A platform designed to connect Swedish engineers with job opportunities, resources, and a community of professionals. Features include job listings, networking events, and industry news.',
		icon: 'logoSI',
		link: 'https://www.sverigesingenjorer.se',
	},
	{
		title: 'Musikhjälpen',
		date: '2025',
		description:
			'A comprehensive redesign and development of the Musikhjälpen website to enhance user experience, accessibility, and performance. Implemented responsive design principles and optimized content delivery for a diverse audience.',
		icon: 'heart',
		link: 'https://bossan.musikhjalpen.se/',
	},
	{
		title: 'Sopra Steria',
		date: '2023 - Present',
		description:
			'A suite of internal tools built for Sopra Steria employees to streamline various workflows and improve productivity. Developed using modern web technologies and integrated with existing systems to ensure seamless operation.',
		icon: 'logoSopra',
		link: 'https://www.soprasteria.se',
	},
	{
		title: 'We Know IT',
		date: '2022 - 2023',
		description:
			'An internal dashboard application for WeKnowIT employees to manage projects, track progress, and collaborate effectively. Built with a focus on usability and integration with existing company tools.',
		icon: 'code',
		link: 'https://www.weknowit.se/',
	},
] as Array<Project>;

export const sideProjects = [
	{
		title: 'Diffly',
		date: 'In Development',
		description: 'A visual regression testing tool.',
		icon: 'logoDiffly',
		link: `${SITE_GITHUB_URL}`,
		technologies: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'Chakra UI', 'Sequelize ORM'],
	},
	{
		title: 'Loop Agile',
		description:
			'Web-based communications platform acting as a forum for signed in users. Built for the purpose to learn full-stack React development and design patterns. Used an ORM on the middle layer and a component library on front-end.',
		image: '/assets/projects/loop-agile.png',
		icon: 'github',
		link: `${SITE_GITHUB_URL}/loop-agile`,
		technologies: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'Chakra UI', 'Sequelize ORM'],
	},
	{
		title: 'Campspotter',
		description:
			'Collection of user-created campgrounds where others can find and review them. Built for the purpose to learn how to use dynamic templating and integrating a database to the front-end while utilizing APIs and third party packages.',
		image: '/assets/projects/camp-spotter.png',
		icon: 'github',
		link: `${SITE_GITHUB_URL}/camp-spotter`,
		technologies: ['JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'Mapbox API'],
	},
	{
		title: 'simny.dev',
		description:
			'My Personal portfolio website that you are currently visiting. Created my own design system for a unique look. Built with dynamic content management to add projects and posts using headless CMS.',
		image: '/assets/projects/snystrom.png',
		icon: 'user',
		link: `${SITE_GITHUB_URL}/simny.dev`,
		technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
	},
	{
		title: 'Supertrivia',
		description:
			'One of my first projects with vanilla js. Randomized quiz based on the Open Trivia DB API. Built to learn the basics of the capabilities with js and how to manage the DOM.',
		image: '/assets/projects/supertrivia.png',
		icon: 'link',
		link: 'https://supertrivia.netlify.app/',
		technologies: ['JavaScript', 'HTML', 'CSS'],
	},
	{
		title: 'Arcturus',
		description:
			'Arcade styled 2D space shooter game with unlimited levels and infinitely increasing difficulty. Has different enemy types and various power ups. Handles game saves locally to file. Built to solidify knowledge about object-oriented programming and learn to implement GUI for Java Apps.',
		image: '/assets/projects/arcturus.png',
		icon: 'github',
		link: `${SITE_GITHUB_URL}/arcturus`,
		technologies: ['Java', 'JavaFX', 'CSS'],
	},
] as Array<Project>;
