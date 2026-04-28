export const isProduction = process.env.NODE_ENV === 'production';

const DEFAULT_SITE_URL = 'https://simny.dev';

function normalizeSiteUrl(value?: string) {
	if (!value) return null;
	return value.startsWith('http') ? value : `https://${value}`;
}

export const SITE_URL =
	normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
	(isProduction
		? (normalizeSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ?? DEFAULT_SITE_URL)
		: (normalizeSiteUrl(process.env.VERCEL_URL) ?? 'http://localhost:3000'));

export const SITE_NAME = 'Simon Nyström';
export const SITE_TITLE = 'Simon Nyström | Web Engineer';
export const SITE_DESCRIPTION =
	"I'm Simon Nyström, a Web Engineer with a passion for crafting intentional interfaces and web experiences. Hobbyist photographer with focus on adventure and lifestyle.";
export const SITE_KEYWORDS = [
	'simny',
	'simnys',
	'simon nyström',
	'web engineer',
	'web developer',
	'ui design',
	'frontend development',
	'interface design',
	'user experience',
	'photography',
	'lifestyle photography',
	'adventure photography',
];

export const SITE_CONTACT = 'simons.nystrom@gmail.com';
export const SITE_GITHUB_URL = 'https://github.com/simnys';
export const SITE_X_URL = 'https://twitter.com/steinvar';
export const SITE_INSTAGRAM_URL = 'https://www.instagram.com/simonnystrom';
export const SITE_LINKEDIN_URL = 'https://linkedin.com/in/simon-nystrom';
