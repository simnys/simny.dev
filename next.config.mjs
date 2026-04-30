import { withContentCollections } from '@content-collections/next';
import withPlaiceholder from '@plaiceholder/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'dgtzuqphqg23d.cloudfront.net',
				port: '',
			},
		],
	},
};

export default withContentCollections(withPlaiceholder(nextConfig));
