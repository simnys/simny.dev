import { defineCollection, defineConfig } from '@content-collections/core';
import { z } from 'zod';
import { compileMDX } from '@content-collections/mdx';
import { getPlaiceholder } from 'plaiceholder';
import { readFile } from 'fs/promises';
import readingTime from 'reading-time';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import { rehypeCodeOptions } from './lib/rehype/rehype';
import { POST_TYPES } from './lib/types/types';

const BLOG_DIR = 'content/writing';
const NOW_DIR = 'content/now';

const BLOG_ASSETS_DIR = '/assets/writing';

const posts = defineCollection({
	name: 'posts',
	directory: BLOG_DIR,
	include: '**/*.mdx',
	schema: z.object({
		content: z.string(),
		title: z.string(),
		summary: z.string(),
		date: z.string(),
		image: z.string().optional(),
		type: z.enum(POST_TYPES).optional(),
		tags: z.array(z.string()).optional(),
		draft: z.boolean().optional(),
	}),
	transform: async (page, context) => {
		if (page.draft) {
			return {
				...page,
				date: new Date(page.date),
				slug: page._meta.path,
			};
		}

		const content = await compileMDX(context, page, {
			rehypePlugins: [[rehypePrettyCode, rehypeCodeOptions]],
			remarkPlugins: [remarkGfm],
		});

		const imageMeta = await context.cache(page._meta.path, async () => {
			if (!page.image) return null;
			const buffer = await readFile(`./public/${BLOG_ASSETS_DIR}/${page.image}`);
			const { base64, metadata } = await getPlaiceholder(buffer);

			return {
				blur: base64,
				width: metadata.width,
				height: metadata.height,
			};
		});

		return {
			...page,
			content,
			date: new Date(page.date),
			slug: page._meta.path,
			readingTime: readingTime(page.content).text,
			image: page.image ? `${BLOG_ASSETS_DIR}/${page.image}` : undefined,
			imageMeta,
		};
	},
});

const nowEntries = defineCollection({
	name: 'nowEntries',
	directory: NOW_DIR,
	include: '**/*.mdx',
	schema: z.object({
		content: z.string(),
		date: z.string(),
		title: z.string().optional(),
	}),
	transform: async (page, context) => {
		const content = await compileMDX(context, page, {
			remarkPlugins: [remarkGfm],
		});
		return {
			...page,
			content,
			date: new Date(page.date),
			slug: page._meta.path,
		};
	},
});

export default defineConfig({
	content: [posts, nowEntries],
});
