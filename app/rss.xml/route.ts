export const dynamic = 'force-static';

import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from '@/data/constants';
import { getBlogPosts } from '@/lib/blog';
import { Feed } from 'feed';

const feed = new Feed({
	title: SITE_TITLE,
	description: SITE_DESCRIPTION,
	link: SITE_URL,
	id: `${SITE_URL}/writing`,
	feed: `${SITE_URL}/rss.xml`,
	copyright: `All rights reserved ${new Date().getFullYear()}, Simon Nyström`,
	language: 'en',
	image: `${SITE_URL}/images/og.webp`,
});

const posts = getBlogPosts();

export async function GET() {
	try {
		posts.forEach((post) => {
			feed.addItem({
				title: post.title,
				id: `${SITE_URL}/writing/${post.slug}`,
				link: `${SITE_URL}/writing/${post.slug}`,
				description: post.summary,
				date: post.date,
				author: [{ name: SITE_NAME }],
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
