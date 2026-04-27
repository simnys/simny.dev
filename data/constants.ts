export const isProduction = process.env.NODE_ENV === 'production';

export const SITE_URL = isProduction ? 'https://simny.dev' : 'http://localhost:3000';

export const SITE_NAME = 'Simon Nyström';
export const SITE_TITLE = 'Simon Nyström | Web Engineer';
export const SITE_DESCRIPTION =
	'Web engineer with a passion for UI/UX design and adventure photography. Welcome to my digital home.';
export const SITE_KEYWORDS = [
	'simny',
	'simnys',
	'simon nyström',
	'web engineer',
	'web developer',
	'ui design',
	'adventure photography',
];

export const SITE_CONTACT = 'simons.nystrom@gmail.com';
export const SITE_GITHUB_URL = 'https://github.com/simnys';
export const SITE_X_URL = 'https://twitter.com/steinvar';
export const SITE_INSTAGRAM_URL = 'https://www.instagram.com/simonnystrom';
export const SITE_LINKEDIN_URL = 'https://linkedin.com/in/simon-nystrom';
