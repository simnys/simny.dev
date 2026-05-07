export const dynamic = 'force-static';

import { SITE_CONTACT, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/data/constants';
import { getBlogPosts } from '@/lib/blog';
import { Feed } from 'feed';

export async function GET() {
	try {
		const feed = new Feed({
			title: SITE_NAME,
			description: SITE_DESCRIPTION,
			link: SITE_URL,
			id: `${SITE_URL}/writing`,
			feed: `${SITE_URL}/rss.xml`,
			copyright: `All rights reserved ${new Date().getFullYear()}, Simon Nyström`,
			language: 'en',
			image: `${SITE_URL}/images/pixel.png`,
			favicon: `${SITE_URL}/images/pixel.png`,
			author: {
				name: SITE_NAME,
				email: SITE_CONTACT,
				link: SITE_URL,
			},
		});

		const posts = getBlogPosts();

		posts.forEach((post) => {
			feed.addItem({
				title: post.title,
				id: `${SITE_URL}/writing/${post.slug}`,
				link: `${SITE_URL}/writing/${post.slug}`,
				description: post.summary,
				date: post.date,
			});
		});

		return new Response(feed.rss2(), {
			status: 200,
			headers: {
				'Content-type': 'text/xml; charset=utf-8',
			},
		});
	} catch (error) {
		console.error(error);
		return new Response('Error generating feed', { status: 500 });
	}
}
