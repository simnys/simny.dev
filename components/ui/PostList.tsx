'use client';

import { Post } from '@/.content-collections/generated';
import { cn, formatDate } from '@/lib/utils';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Icon } from './Icon';

type PostListProps = {
	posts: Post[];
	query?: string;
};

export default function PostList({ posts, query }: PostListProps) {
	return (
		<motion.ul
			key="posts-view"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{
				type: 'spring',
				stiffness: 300,
				damping: 30,
			}}
			className="flex flex-col gap-1 -mx-6 px-2 md:px-0"
		>
			{posts.map((post) => (
				<motion.li
					key={post.slug}
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						type: 'spring',
						stiffness: 300,
						damping: 30,
						delay: 0.1 * posts.indexOf(post),
					}}
				>
					<Link
						draggable="false"
						className={cn(
							'relative w-full flex flex-col items-baseline gap-x-8 md:gap-x-16 sm:flex-row p-4 lg:px-6 bg-background rounded-xl',
							'',
							'group transition-colors duration-200 ease-out hover:bg-background-secondary'
						)}
						href={`/blog/${post.slug}`}
					>
						<div className="w-full sm:w-fit sm:min-w-20 flex items-baseline gap-x-2 sm:flex-col text-sm text-foreground-tertiary">
							<time>{formatDate(post.date, true)}</time>
							<span className="sm:hidden">·</span>
							<span className="">{post.readingTime}</span>
						</div>

						<div className="flex-1 sm:max-w-4/5">
							<h3 className="text-balance grow my-1 sm:mt-0">{post.title}</h3>
							<p className="text-sm text-foreground-secondary text-pretty line-clamp-2 leading-normal">
								{post.summary}
							</p>
						</div>

						<div className="hidden sm:block mt-auto p-2 rounded-full text-foreground-tertiary transition-all group-hover:text-foreground group-hover:bg-background-tertiary">
							<Icon name="arrow" className="justify-self-end self-end w-4 h-4" />
						</div>
					</Link>
				</motion.li>
			))}
		</motion.ul>
	);
}
