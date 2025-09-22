'use client';

import { Post } from '@/.content-collections/generated';
import { cn, formatDate } from '@/lib/utils';

import { IconArrow } from '@/data/icons';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

type PostListProps = {
	posts: Post[];
	query?: string;
};

const determineMatch = (post: Post, query: string): string => {
	const { title, tags } = post;

	const matchingTag = tags?.find((tag) => tag.toLowerCase().includes(query.toLowerCase()));
	if (matchingTag) {
		return matchingTag;
	}
	if (title.toLowerCase().includes(query.toLowerCase())) {
		return 'Title';
	}
	return '';
};

export default function PostList({ posts, query }: PostListProps) {
	return (
		<motion.ul
			key="posts-view"
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				type: 'spring',
				stiffness: 300,
				damping: 30,
			}}
			className="flex flex-col divide-y border-b"
		>
			<AnimatePresence>
				{posts.map((post) => (
					<motion.li
						key={post.slug}
						layout
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<Link
							draggable="false"
							className={cn(
								'relative flex flex-col items-baseline gap-x-16 sm:flex-row p-6',
								'',
								'group hover:bg-background-secondary/20'
							)}
							href={`/blog/${post.slug}`}
						>
							<div className="w-full sm:w-fit sm:min-w-20 flex items-baseline gap-x-2 sm:flex-col text-sm text-foreground-tertiary">
								<time>{formatDate(post.date, true)}</time>
								<span className="">{post.readingTime}</span>
								<span className="sm:hidden">·</span>
							</div>

							<div className="flex-1 max-w-4/5">
								<h3 className="text-pretty grow mb-1">{post.title}</h3>
								<p className="text-sm text-foreground-secondary line-clamp-2 leading-normal">
									{post.summary}
								</p>
							</div>

							<div className="mt-auto p-2 rounded-full text-foreground-secondary ring-1 ring-transparent ring-offset-background transition-all group-hover:text-foreground group-hover:ring-brand group-hover:ring-offset-2">
								<IconArrow className="justify-self-end self-end w-4 h-4" />
							</div>

							{query && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.15, ease: 'easeOut' }}
									className="absolute top-6 right-6 text-xs text-brand tracking-normal"
								>
									{determineMatch(post, query)}
								</motion.div>
							)}
						</Link>
					</motion.li>
				))}
			</AnimatePresence>
		</motion.ul>
	);
}
