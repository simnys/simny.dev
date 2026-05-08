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
import { mdxToHtml } from './lib/rehype/rehype';

const BLOG_DIR = 'content/writing';
const NOW_DIR = 'content/now';

const posts = defineCollection({
	name: 'posts',
	directory: BLOG_DIR,
	include: '**/*.mdx',
	schema: z.object({
		content: z.string(),
		title: z.string(),
		summary: z.string(),
		date: z.string(),
		type: z.enum(POST_TYPES).optional(),
		tags: z.array(z.string()).optional(),
	}),
	transform: async (page, context) => {
		const content = await compileMDX(context, page, {
			rehypePlugins: [[rehypePrettyCode, rehypeCodeOptions]],
			remarkPlugins: [remarkGfm],
		});

		const slug = page._meta.path;

		const html = await mdxToHtml(page.content, slug);

		return {
			...page,
			content,
			date: new Date(page.date),
			slug,
			readingTime: readingTime(page.content).text,
			html,
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
