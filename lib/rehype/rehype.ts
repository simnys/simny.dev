import fs from 'fs';
import { type Options } from 'rehype-pretty-code';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import { SITE_URL } from '@/data/constants';

const MDX_TAG_MAP: Record<string, string> = {
	Link: 'a',
	Divider: 'hr',
	Callout: 'blockquote',
	Quote: 'blockquote',
};

function remarkMdxToHtml(slug: string) {
	return () => (tree: any) => {
		visit(tree, ['mdxJsxFlowElement', 'mdxJsxTextElement'], (node) => {
			const attr = (name: string) => {
				const a = node.attributes?.find((a: any) => a.name === name);
				return typeof a?.value === 'string' ? a.value : a?.value?.value;
			};

			if (node.name === 'Image') {
				const caption = attr('caption');
				node.type = 'html';
				node.value = `<figure><img src="${SITE_URL}/assets/writing/${slug}/${attr('src')}" alt="${attr('alt') ?? ''}">${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;
				return;
			}

			const tag = MDX_TAG_MAP[node.name];
			if (tag) {
				node.data = {
					hName: tag,
					hProperties: node.name === 'Link' ? { href: attr('href') ?? '#' } : {},
				};
			}
		});
	};
}

export async function mdxToHtml(content: string, slug: string): Promise<string> {
	return String(
		await unified()
			.use(remarkParse)
			.use(remarkGfm)
			.use(remarkMdx)
			.use(remarkMdxToHtml(slug))
			.use(remarkRehype, { allowDangerousHtml: true })
			.use(rehypeStringify, { allowDangerousHtml: true })
			.process(content),
	);
}

export const rehypeCodeOptions: Partial<Options> = {
	theme: JSON.parse(fs.readFileSync('./lib/rehype/simny-theme.json', 'utf-8')),
	keepBackground: false,
	bypassInlineCode: true,
};
