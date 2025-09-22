import CustomLink from '@/components/blog/Link';
import PageHeader from '@/components/layouts/PageHeader';
import { Section } from '@/components/layouts/Section';
import { IconDesign } from '@/data/icons';

import { cn } from '@/lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Colophon',
	description: 'A summary of the technologies, design, workflow and decisions behind my website.',
};

export default function Colophon() {
	return (
		<main className="grow">
			<PageHeader
				title="Colophon"
				content="A summary of the technologies, design, workflow and decisions behind my website."
				subtitle={{ text: 'Design', Icon: IconDesign }}
			/>

			<Section className="px-4 py-10 space-y-8 max-w-3xl mx-auto">
				{content.map((c) => (
					<div key={c.heading} className="sm:grid grid-cols-12 gap-2">
						<h2 className="col-span-3 pb-2">{c.heading}</h2>
						<p className="col-span-9 leading-7 text-foreground-secondary">{c.text}</p>
					</div>
				))}
			</Section>

			<Section className="pt-10 overflow-y-visible space-y-8 border-t">
				<div className="flex flex-col sm:flex-row gap-2 px-4 max-w-3xl mx-auto w-full">
					<p className="flex-1 text-lg tracking-normal sm:tracking-wide font-medium">
						ABCDEFGHIJKLMNOPQRSTUVWXYZ
						<br />
						abcdefghijklmnopqrstuvwxyz
						<br />
						1234567890
					</p>
					<CustomLink
						href="https://www.fontshare.com/?q=General%20Sans"
						className="text-pretty self-end justify-self-end text-sm font-medium text-foreground-secondary"
					>
						General Sans
					</CustomLink>
				</div>

				<div className="flex flex-col sm:flex-row gap-2 px-4 font-mono max-w-3xl mx-auto w-full">
					<p className="flex-1 text-lg tracking-normal sm:tracking-wide font-medium">
						ABCDEFGHIJKLMNOPQRSTUVWXYZ
						<br />
						abcdefghijklmnopqrstuvwxyz
						<br />
						1234567890
					</p>
					<CustomLink
						href={'https://vercel.com/font'}
						className="text-pretty text-foreground-secondary self-end justify-self-end text-sm font-medium"
					>
						Geist Mono
					</CustomLink>
				</div>

				{/* COLOR SWATCHES */}
				<div className="sm:grid grid-cols-12 pt-2 border-b">
					{swatches.map((swatch, i) => (
						<div
							key={swatch.key}
							className={cn(
								'col-span-4 flex flex-col bg-background-secondary h-44 border-t',
								i < 2 && 'border-r'
							)}
						>
							<div
								className={cn(
									'my-2 mx-4 sm:m-0 sm:w-full h-3/4 text-sm font-medium flex items-center justify-center rounded-2xl ring-1 ring-border',
									swatch.bgClass
								)}
							>
								<span className="hidden dark:block">{swatch.dark.name}</span>
								<span className={cn('block dark:hidden', swatch.light.textClass)}>
									{swatch.light.name}
								</span>
							</div>
							<div className="mt-auto w-full h-1/4 px-4 sm:px-3 flex justify-between items-center text-sm text-foreground-secondary sm:border-t">
								<span>{swatch.label}</span>
								<span className="hidden dark:block">{swatch.dark.color}</span>
								<span className="block dark:hidden">{swatch.light.color}</span>
							</div>
						</div>
					))}
				</div>
			</Section>
		</main>
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
		label: 'Brand',
		light: {
			name: 'Bluetiful',
			color: '#2663F2',
			textClass: 'text-background',
		},
		dark: { name: 'Sky Dancer', color: '#5286FF' },
	},
	{
		key: 'backgrounds',
		bgClass: 'bg-background',
		label: 'Backgrounds',
		light: { name: 'Salt', color: '#EEEEE7' },
		dark: { name: 'Metal', color: '#0F1114' },
	},
	{
		key: 'foregrounds',
		bgClass: 'bg-foreground text-background',
		label: 'Foregrounds',
		light: { name: 'Charcoal', color: '#212121' },
		dark: { name: 'Pearl', color: '#F0F0EA' },
	},
];
