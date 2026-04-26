import Footer from '@/components/layouts/Footer';
import Navbar from '@/components/layouts/Navbar';

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
import localFont from 'next/font/local';
import Script from 'next/script';
import { Person, WithContext } from 'schema-dts';
import Providers from './providers';

const fontSerif = localFont({
	src: '../public/fonts/Newsreader-Italic.woff2',
	display: 'swap',
	weight: '400',
	style: 'italic',
	variable: '--font-serif',
});
const fontSans = localFont({
	src: '../public/fonts/InterVariable.woff2',
	display: 'swap',
	variable: '--font-sans',
});
const fontCode = localFont({
	src: '../public/fonts/GeistMono.woff2',
	display: 'swap',
	weight: '400',
	variable: '--font-code',
});

export const viewport: Viewport = {
	maximumScale: 5,
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#fafafa' },
		{ media: '(prefers-color-scheme: dark)', color: '#0f0f0f' },
	],
};

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`,
	},
	description: SITE_DESCRIPTION,
	keywords: SITE_KEYWORDS,
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
			alt: SITE_DESCRIPTION,
		},
		locale: 'en_US',
		alternateLocale: 'en_SE',
	},
	twitter: {
		card: 'summary_large_image',
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		images: { url: `${SITE_URL}/images/og.jpg`, width: 1200, height: 630, alt: SITE_DESCRIPTION },
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
	icons: '/favicon.ico',
	alternates: {
		types: {
			'application/rss+xml': [
				{
					title: 'Blog RSS Feed',
					url: `${SITE_URL}/rss.xml`,
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
		image: `${SITE_URL}/images/hero.jpg`,
		sameAs: [SITE_GITHUB_URL, SITE_LINKEDIN_URL, SITE_INSTAGRAM_URL],
		jobTitle: 'Web Engineer & Photographer',
	};

	return (
		<html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
			<Script
				type="application/ld+json"
				id="global_jsonLd"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>

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
				{/* <Script
					src="https://analytics.eu.umami.is/script.js"
					data-website-id="0ab801df-b78b-462a-80b5-4630493addc6"
				/> */}
			</body>
		</html>
	);
}
