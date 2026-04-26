import { Post } from '@/.content-collections/generated';
import { cn, formatDate } from '@/lib/utils';
import Link from 'next/link';
import { Icon } from './Icon';

type PostListProps = {
	posts: Post[];
};

const PostMeta = ({ date, readingTime }: { date: Date; readingTime: string }) => (
	<div className="font-serif text-[15px] w-full sm:w-fit sm:min-w-20 flex items-center gap-x-2 text-foreground-tertiary group-hover:text-foreground-secondary transition-colors duration-200 ease-out">
		<time dateTime={date.toISOString()} className="">
			{formatDate(date, true)}
		</time>
		<span className="sm:hidden" aria-hidden="true">
			|
		</span>
		<span className="sm:hidden">{readingTime}</span>
	</div>
);

const PostTitle = ({ title }: { title: string }) => (
	<div className="flex-1 sm:max-w-[80%]">
		<h3 className="text-balance leading-normal line-clamp-2 sm:text-foreground-secondary group-hover:text-foreground transition-colors duration-200 ease-out">
			{title}
		</h3>
	</div>
);

const ReadingTime = ({ readingTime }: { readingTime: string }) => {
	const minutes = readingTime.split(' ')[0];

	return (
		<div className="hidden sm:flex items-center gap-x-1 font-serif text-[15px] text-foreground-tertiary group-hover:text-foreground-secondary transition-colors duration-200 ease-out leading-normal">
			<Icon name="hourglass" className="size-3.5" aria-hidden="true" />
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
				'w-full flex flex-col gap-y-1 gap-x-8 px-4 py-3.5',
				'sm:flex-row sm:items-baseline sm:gap-x-16',
				// Styling
				'bg-background rounded-xl',
				'group transition-colors duration-200 ease-out hover:bg-background-tertiary',
			)}
			aria-label={`Read ${post.title}`}
		>
			<PostMeta date={post.date} readingTime={post.readingTime} />
			<PostTitle title={post.title} />
			<ReadingTime readingTime={post.readingTime} />
		</Link>
	</li>
);

export default function PostList({ posts }: PostListProps) {
	if (!posts.length) {
		return <div className="text-center py-8 text-foreground-secondary">No posts found.</div>;
	}

	return (
		<ul className="flex flex-col -mx-4" role="list">
			{posts.map((post) => (
				<PostItem key={post.slug} post={post} />
			))}
		</ul>
	);
}
