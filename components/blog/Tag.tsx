import { cn, slugify } from '@/lib/utils';
import Link from 'next/link';

export default function Tag({ tag, className }: { tag: string; className?: string }) {
	return (
		<Link
			href={`/blog/tag/${slugify(tag.toLowerCase())}`}
			className={cn(
				'font-mono tracking-tight inline-flex items-center w-fit px-2 py-0.5 text-xs rounded-md text-foreground-secondary hover:text-foreground cursor-pointer transition-colors duration-200 ease-out group',
				className
			)}
		>
			<span>#</span>
			{tag.toLowerCase()}
		</Link>
	);
}
