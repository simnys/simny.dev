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
			'Tech lead. Continuously implementing new features, and ensuring a seamless user experience for 200k members.',
		icon: 'logoSI',
		link: 'https://www.sverigesingenjorer.se',
	},
	{
		title: 'Musikhjälpen',
		date: '2025',
		description:
			'Lead Frontend Developer. A comprehensive redesign to enhance user experience, accessibility, and performance.',
		icon: 'heart',
		link: 'https://bossan.musikhjalpen.se/',
	},
	{
		title: 'Sopra Steria',
		date: '2023 - Present',
		description:
			'Web engineer. Working on a variety of projects for clients. Focus on building scalable and maintainable web applications.',
		icon: 'logoSopra',
		link: 'https://www.soprasteria.se',
	},
	{
		title: 'We Know IT',
		date: '2022 - 2023',
		description:
			'Frontend Developer. Built a chat platform with real-time messaging and video conferencing features.',
		icon: 'code',
		link: 'https://www.weknowit.se/',
	},
] as Array<Project>;

export const sideProjects = [
	{
		title: 'Diffly',
		date: 'In Development',
		description: 'Visual regression testing tool.',
		icon: 'logoDiffly',
		link: `${SITE_GITHUB_URL}`,
		technologies: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'Chakra UI', 'Sequelize ORM'],
	},
	{
		title: 'Loop Agile',
		description: 'Internal intranet social platform.',
		image: '/assets/projects/loop-agile.png',
		icon: 'github',
		link: `${SITE_GITHUB_URL}/loop-agile`,
		technologies: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'Chakra UI', 'Sequelize ORM'],
	},
	{
		title: 'Campspotter',
		description: 'C2C platform for reviewing campsites.',
		image: '/assets/projects/camp-spotter.png',
		icon: 'github',
		link: `${SITE_GITHUB_URL}/camp-spotter`,
		technologies: ['JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'Mapbox API'],
	},
	{
		title: 'simny.dev',
		description: 'My personal website.',
		image: '/assets/projects/snystrom.png',
		icon: 'user',
		link: `${SITE_GITHUB_URL}/simny.dev`,
		technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
	},
	{
		title: 'Supertrivia',
		description: 'Simple quiz app. First JS project.',
		image: '/assets/projects/supertrivia.png',
		icon: 'link',
		link: 'https://supertrivia.netlify.app/',
		technologies: ['JavaScript', 'HTML', 'CSS'],
	},
	{
		title: 'Arcturus',
		description: 'Arcade styled 2D space shooter game.',
		image: '/assets/projects/arcturus.png',
		icon: 'github',
		link: `${SITE_GITHUB_URL}/arcturus`,
		technologies: ['Java', 'JavaFX', 'CSS'],
	},
] as Array<Project>;
