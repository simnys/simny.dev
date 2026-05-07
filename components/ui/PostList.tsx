import { Post } from '@/.content-collections/generated';
import { PostType } from '@/lib/types/types';
import { cn, formatDate } from '@/lib/utils';
import Link from 'next/link';

const bar = (opacity: 'low' | 'mid', width: string, className?: string) => (
	<div
		className={cn(
			'h-0.75 rounded',
			opacity === 'low'
				? 'bg-foreground/10 dark:bg-foreground/30'
				: 'bg-foreground/20 dark:bg-foreground/40',
			width,
			className,
		)}
	/>
);

const typeCardContent: Record<NonNullable<PostType>, React.ReactNode> = {
	article: (
		<>
			{bar('mid', 'w-2/3', 'h-1 my-1')}
			{bar('low', 'w-full')}
			{bar('low', 'w-4/5', 'mb-1')}
			{bar('low', 'w-2/3')}
			{bar('low', 'w-1/3')}
		</>
	),
	component: (
		<>
			<div className="h-6 -mx-0.5 mb-1 rounded-sm bg-foreground/10 dark:bg-foreground/30" />
			{bar('low', 'w-4/5')}
			{bar('low', 'w-1/3')}
		</>
	),
	skill: (
		<>
			<div className="flex gap-1">
				{bar('low', 'w-2')}
				{bar('low', 'w-full')}
			</div>
			<div className="flex gap-1 mb-1">
				{bar('low', 'w-2')}
				{bar('low', 'w-full')}
			</div>
			<hr className="-mx-1.5 mb-1" />
			{bar('mid', 'w-3/4')}
			{bar('low', 'w-full')}
			{bar('low', 'w-1/3')}
		</>
	),
};

const PostTypeCard = ({ type = 'article' }: { type: PostType }) => (
	<div className="w-12 h-15 flex flex-col shrink-0 gap-y-1 px-1.5 py-1 rounded-md bg-background-secondary border border-border shadow-xs">
		{typeCardContent[type]}
	</div>
);

const PostItem = ({ post }: { post: Post }) => (
	<li>
		<Link
			href={`/writing/${post.slug}`}
			aria-label={`Read ${post.title}`}
			className={cn(
				'group w-full flex items-center gap-x-4 px-2.5 py-2',
				'rounded-xl bg-background',
				'transition-colors duration-200 ease-out hover:bg-background-tertiary',
			)}
		>
			<PostTypeCard type={post.type} />

			<div className="grow space-y-1 min-w-0">
				<h3 className="text-balance line-clamp-2 sm:text-foreground-secondary group-hover:text-foreground transition-colors duration-200 ease-out leading-tight">
					{post.title}
				</h3>
				<time
					dateTime={post.date.toISOString()}
					className="block text-sm text-foreground-tertiary group-hover:text-foreground-secondary transition-colors duration-200 ease-out"
				>
					{formatDate(post.date, true)}
				</time>
			</div>

			<span className="hidden sm:block shrink-0 text-xs font-[450] text-foreground-tertiary group-hover:text-foreground-secondary transition-colors duration-200 ease-out">
				{post.readingTime.split(' ')[0]}min
			</span>
		</Link>
	</li>
);

export default function PostList({ posts }: { posts: Post[] }) {
	if (!posts.length) {
		return <p className="py-8 text-center text-foreground-secondary">No posts found.</p>;
	}

	return (
		<ul role="list" className="flex flex-col gap-y-2 sm:gap-y-0 -mx-2">
			{posts.map((post) => (
				<PostItem key={post.slug} post={post} />
			))}
		</ul>
	);
}
