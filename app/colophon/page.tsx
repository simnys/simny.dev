import CustomLink from '@/components/blog/Link';
import PageHeader from '@/components/layouts/PageHeader';
import { Section } from '@/components/layouts/Section';

import { cn } from '@/lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Colophon',
	description: 'A summary of the technologies, design, workflow and decisions behind my website.',
};

export default function Colophon() {
	return (
		<>
			<PageHeader
				title="Colophon"
				content="A summary of the technologies, design, workflow and decisions behind my website."
			/>

			<section className="space-y-6">
				{content.map((c) => (
					<div key={c.heading} className="sm:grid grid-cols-12 gap-2">
						<h2 className="col-span-3 pb-2">{c.heading}</h2>
						<p className="col-span-9 prose text-foreground-secondary">{c.text}</p>
					</div>
				))}
			</section>

			{/* COLOR SWATCHES */}
			<div className="grid sm:grid-cols-3 gap-4 sm:gap-2">
				{swatches.map((swatch, i) => (
					<div
						key={swatch.key}
						className="flex flex-col bg-background-secondary h-44 border rounded-xl shadow-xs overflow-hidden"
					>
						<div
							className={cn(
								'm-1.5 h-3/4 uppercase flex items-center justify-center rounded-lg border',
								swatch.bgClass,
							)}
						>
							<span className="hidden dark:block">{swatch.dark.name}</span>
							<span className={cn('block dark:hidden', swatch.light.textClass)}>
								{swatch.light.name}
							</span>
						</div>
						<div className="px-3 pb-2 text-sm text-foreground-secondary">
							<span className="font-medium inline-block mb-1">{swatch.label}</span>
							<span className="hidden dark:block text-[12px]">{swatch.dark.color}</span>
							<span className="block dark:hidden text-[12px]">{swatch.light.color}</span>
						</div>
					</div>
				))}
			</div>
		</>
	);
}

const content = [
	{
		heading: 'Overview',
		text: (
			<>
				This site is all about being fast, accessible, and easy on the eyes. I built and designed it
				myself, focusing on clean code, smooth layouts, and a user experience that just feels right.
				Everything is meant to be modern, simple, and a breeze to use.
			</>
		),
	},
	{
		heading: 'Technologies',
		text: (
			<>
				Under the hood, it runs on <CustomLink href="https://nextjs.org">Next.js</CustomLink> (App
				Router), <CustomLink href="https://react.dev">React</CustomLink>, and{' '}
				<CustomLink href="https://typescriptlang.org">TypeScript</CustomLink>. Styling is handled
				with <CustomLink href="https://tailwindcss.com">Tailwind CSS</CustomLink> and a few custom
				utilities. Most content is static for speed, but there are dynamic bits powered by server
				components and edge functions.
			</>
		),
	},
	{
		heading: 'Design & Colors',
		text: (
			<>
				The vibe I&apos;m going for is minimal, with neutral colors and blue accents to keep things
				fresh.{' '}
				<CustomLink href="https://www.fontshare.com/?q=General%20Sans">General Sans</CustomLink> and{' '}
				<CustomLink href={'https://vercel.com/font'}>Geist Mono</CustomLink> handle the typography,
				making everything readable and stylish. Layouts are flexible and responsive, with plenty of
				space and a grid to keep things tidy.
			</>
		),
	},
	{
		heading: 'Inspirations',
		text: (
			<>
				I&apos;ve taken cues from the design systems of{' '}
				<CustomLink href="https://tailwindcss.com">Tailwind CSS</CustomLink> and{' '}
				<CustomLink href="https://vercel.com">Vercel</CustomLink>. Some developer portfolios that
				also influenced my own approach are{' '}
				<CustomLink href="https://braydoncoyer.dev">Braydon Coyer</CustomLink>,{' '}
				<CustomLink href="https://maximeheckel.com">Maxime Heckel</CustomLink>, and{' '}
				<CustomLink href="https://jakub.kr">Jakub Krehel</CustomLink>. Go give them a visit, they
				have killer sites!
			</>
		),
	},
];

const swatches = [
	{
		key: 'brand',
		bgClass: 'bg-brand',
		label: 'Accent',
		light: {
			name: 'Kyanite',
			color: 'oklch(0.55 0.24 263)',
			textClass: 'text-background',
		},
		dark: { name: 'Clear Blue', color: 'oklch(0.62 0.2 260)' },
	},
	{
		key: 'backgrounds',
		bgClass: 'bg-background',
		label: 'Background',
		light: { name: 'Emptiness', color: 'oklch(0.99 0 0)' },
		dark: { name: 'Chaos Black', color: 'oklch(0.17 0 0)' },
	},
	{
		key: 'foregrounds',
		bgClass: 'bg-foreground text-background',
		label: 'Foreground',
		light: { name: 'Lead', color: 'oklch(0.24 0 0)' },
		dark: { name: 'Super Silver', color: 'oklch(0.95 0 0)' },
	},
];
