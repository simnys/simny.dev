import { Analytics } from '@vercel/analytics/next';

import Footer from '@/components/layouts/Footer';
import Navbar from '@/components/layouts/Navbar';
import StructuredData from '@/components/seo/StructuredData';

import {
	SITE_CONTACT,
	SITE_DESCRIPTION,
	SITE_GITHUB_URL,
	SITE_INSTAGRAM_URL,
	SITE_KEYWORDS,
	SITE_LINKEDIN_URL,
	SITE_NAME,
	SITE_TITLE,
	SITE_URL,
} from '@/data/constants';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';

import type { Metadata, Viewport } from 'next';
import { Inter, Libre_Baskerville, Geist_Mono } from 'next/font/google';
import { Person, WithContext } from 'schema-dts';
import Providers from './providers';

const fontSans = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-sans',
});
const fontSerif = Libre_Baskerville({
	subsets: ['latin'],
	display: 'swap',
	weight: '400',
	style: ['normal', 'italic'],
	variable: '--font-serif',
});
const fontCode = Geist_Mono({
	subsets: ['latin'],
	display: 'swap',
	weight: '400',
	variable: '--font-code',
});

export const viewport: Viewport = {
	maximumScale: 5,
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#fcfcfc' },
		{ media: '(prefers-color-scheme: dark)', color: '#0f0f0f' },
	],
};

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: SITE_TITLE,
		template: `%s | ${SITE_NAME}`,
	},
	description: SITE_DESCRIPTION,
	keywords: SITE_KEYWORDS,
	authors: [{ name: SITE_NAME, url: SITE_URL }],
	openGraph: {
		type: 'website',
		siteName: SITE_NAME,
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		url: SITE_URL,
		images: {
			url: `${SITE_URL}/images/og.jpg`,
			width: 1200,
			height: 630,
			alt: `${SITE_NAME} — Web Engineer`,
		},
		locale: 'en_US',
		alternateLocale: 'en_SE',
	},
	twitter: {
		card: 'summary_large_image',
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		images: {
			url: `${SITE_URL}/images/og.jpg`,
			width: 1200,
			height: 630,
			alt: `${SITE_NAME} — Web Engineer`,
		},
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
		},
	},
	manifest: '/manifest.webmanifest',
	referrer: 'origin',
	alternates: {
		types: {
			'application/rss+xml': [
				{
					title: 'Blog RSS Feed',
					url: `${SITE_URL}/rss`,
				},
			],
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const jsonLd: WithContext<Person> = {
		'@type': 'Person',
		'@context': 'https://schema.org',
		name: SITE_NAME,
		description: SITE_DESCRIPTION,
		email: SITE_CONTACT,
		url: SITE_URL,
		image: `${SITE_URL}/images/pixel.png`,
		sameAs: [SITE_GITHUB_URL, SITE_LINKEDIN_URL, SITE_INSTAGRAM_URL],
		jobTitle: 'Web Engineer',
	};

	return (
		<html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
			<StructuredData id="global_jsonLd" data={jsonLd} />

			<body
				className={cn(
					fontSerif.variable,
					fontSans.variable,
					fontCode.variable,
					'flex flex-col min-h-screen',
				)}
			>
				<Providers>
					<Navbar />

					<main className="max-w-3xl mx-auto w-full grow relative flex flex-col gap-12 sm:gap-16 p-6 mb-10 sm:mb-20">
						{children}
					</main>

					<Footer />
				</Providers>

				<Analytics />
			</body>
		</html>
	);
}
