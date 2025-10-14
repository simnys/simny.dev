import { Project } from '@/lib/types/types';

export enum Skills {
	HTML = 'HTML',
	CSS = 'CSS',
	JS = 'JavaScript',
	TS = 'TypeScript',
	React = 'React',
	Next = 'Next.js',
	Node = 'Node',
	Git = 'Git',
	TW = 'Tailwind',
	Prisma = 'Prisma',
	Mongo = 'MongoDB',
	GraphQL = 'GraphQL',
	Express = 'Express',
	Postgres = 'Postgres',
	Supabase = 'Supabase',
	Java = 'Java',
	CSHARP = 'C#',
	NET = '.NET',
	Framer = 'Framer Motion',
	Contentful = 'Contentful',
	Optimizely = 'Optimizely',
	Docker = 'Docker',
}
export const skillsList = Object.values(Skills);

export const projectsData = [
	{
		title: 'Loop Agile',
		description:
			'Web-based communications platform acting as a forum for signed in users. Built for the purpose to learn full-stack React development and design patterns. Used an ORM on the middle layer and a component library on front-end.',
		image: '/assets/projects/loop-agile.png',
		stack: [
			Skills.React,
			Skills.Node,
			Skills.Express,
			Skills.Postgres,
			'Chakra UI',
			'Sequelize ORM',
		],
		deployLink: 'https://loop-agile.vercel.app/',
		githubLink: 'https://github.com/simstrom/loop-agile',
	},
	{
		title: 'CampSpotter',
		description:
			'Collection of user-created campgrounds where others can find and review them. Built for the purpose to learn how to use dynamic templating and integrating a database to the front-end while utilizing APIs and third party packages.',
		image: '/assets/projects/camp-spotter.png',
		stack: [Skills.JS, Skills.Node, Skills.Express, Skills.Mongo, 'Mapbox API'],
		githubLink: 'https://github.com/simstrom/camp-spotter',
	},
	{
		title: 'Snystrom.com',
		description:
			'My Personal portfolio website that you are currently visiting. Created my own design system for a unique look. Built with dynamic content management to add projects and posts using headless CMS.',
		image: '/assets/projects/snystrom.png',
		stack: [Skills.Next, Skills.TS, Skills.TW, Skills.Supabase],
		deployLink: '/colophon',
		githubLink: 'https://github.com/simstrom/camp-spotter',
	},
	{
		title: 'Supertrivia',
		description:
			'One of my first projects with vanilla js. Randomized quiz based on the Open Trivia DB API. Built to learn the basics of the capabilities with js and how to manage the DOM.',
		image: '/assets/projects/supertrivia.png',
		stack: [Skills.JS, Skills.HTML, Skills.CSS],
		deployLink: 'https://supertrivia.netlify.app/',
		githubLink: 'https://github.com/simstrom/snystrom.com',
	},
	{
		title: 'Arcturus',
		description:
			'Arcade styled 2D space shooter game with unlimited levels and infinitely increasing difficulty. Has different enemy types and various power ups. Handles game saves locally to file. Built to solidify knowledge about object-oriented programming and learn to implement GUI for Java Apps.',
		image: '/assets/projects/arcturus.png',
		stack: [Skills.Java, 'JavaFX', Skills.CSS],
		githubLink: 'https://github.com/simstrom/arcturus',
	},
] as Array<Project>;
