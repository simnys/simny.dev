import { Post } from '@/.content-collections/generated';
import { cn, formatDate } from '@/lib/utils';
import Link from 'next/link';
import { Icon } from './Icon';

type PostListProps = {
	posts: Post[];
};

const PostTypeCard = () => (
	<div className="w-12 h-15 flex flex-col shrink-0 justify-center gap-y-1 p-1.5 py-1 rounded-md bg-background-secondary border border-border shadow-xs">
		<div className="h-0.75 bg-foreground/10 dark:bg-foreground/30 rounded w-2/3 mb-1"></div>
		<div className="h-0.75 bg-background-tertiary dark:bg-foreground/20 rounded w-full"></div>
		<div className="h-0.75 bg-background-tertiary dark:bg-foreground/20 rounded w-4/5 mb-1"></div>
		<div className="h-0.75 bg-background-tertiary dark:bg-foreground/20 rounded w-2/3"></div>
		<div className="h-0.75 bg-background-tertiary dark:bg-foreground/20 rounded w-1/3"></div>
	</div>
);

const PostMeta = ({ date }: { date: Date }) => (
	<div className="font-serif text-[15px] text-foreground-tertiary group-hover:text-foreground-secondary transition-colors duration-200 ease-out">
		<time dateTime={date.toISOString()}>{formatDate(date, true)}</time>
	</div>
);

const PostTitle = ({ title }: { title: string }) => (
	<h3 className="text-balance line-clamp-2 sm:text-foreground-secondary group-hover:text-foreground transition-colors duration-200 ease-out leading-tight">
		{title}
	</h3>
);

const ReadingTime = ({ readingTime }: { readingTime: string }) => {
	const minutes = readingTime.split(' ')[0];

	return (
		<div className="hidden sm:block text-xs font-[450] text-foreground-tertiary group-hover:text-foreground-secondary transition-colors duration-200 ease-out leading-normal">
			<span>{minutes}min</span>
		</div>
	);
};

const PostItem = ({ post }: { post: Post }) => (
	<li>
		<Link
			href={`/writing/${post.slug}`}
			className={cn(
				// Layout
				'w-full flex items-center gap-x-4 px-2.5 py-2',
				// Styling
				'bg-background rounded-xl',
				'group transition-colors duration-200 ease-out hover:bg-background-tertiary',
			)}
			aria-label={`Read ${post.title}`}
		>
			<PostTypeCard />
			<div className="grow space-y-1">
				<PostTitle title={post.title} />
				<PostMeta date={post.date} />
			</div>
			<ReadingTime readingTime={post.readingTime} />
		</Link>
	</li>
);

export default function PostList({ posts }: PostListProps) {
	if (!posts.length) {
		return <div className="text-center py-8 text-foreground-secondary">No posts found.</div>;
	}

	return (
		<ul className="flex flex-col -mx-4 sm:-mx-2" role="list">
			{posts.map((post) => (
				<PostItem key={post.slug} post={post} />
			))}
		</ul>
	);
}
