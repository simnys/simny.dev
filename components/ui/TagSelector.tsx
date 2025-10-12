import { cn, slugify } from '@/lib/utils';
import Link from 'next/link';

interface TagSelectorProps {
	tags: string[];
	activeTag: string;
}

export function TagSelector({ tags, activeTag }: TagSelectorProps) {
	return (
		<div className="px-2 -mx-6 sm:mx-0 sm:px-0 border-b">
			<nav
				className="flex gap-x-1 p-0.5 font-medium text-sm tracking-normal overflow-y-visible overflow-x-auto no-scrollbar mask-[linear-gradient(to_right,white_90%,transparent)]"
				id="blog-tags"
			>
				<Link
					href="/blog"
					aria-current={!activeTag ? 'page' : undefined}
					className={cn(
						!activeTag
							? 'text-brand after:bg-brand'
							: 'text-foreground-tertiary transition-colors duration-200 ease-out hover:after:bg-foreground hover:text-foreground after:transition-colors after:duration-200 after:ease-out',
						'relative whitespace-nowrap px-2 py-1 after:content-["_"] after:absolute after:z-10 after:-bottom-0.5 after:left-0 after:h-px after:w-full after:rounded-full'
					)}
				>
					All
				</Link>
				{tags.map((tag) => (
					<Link
						key={tag}
						href={`/blog/tag/${slugify(tag)}`}
						aria-current={activeTag === tag ? 'page' : undefined}
						className={cn(
							activeTag === tag
								? 'text-brand after:bg-brand'
								: 'text-foreground-tertiary transition-colors duration-200 ease-out hover:after:bg-foreground hover:text-foreground after:transition-colors after:duration-200 after:ease-out',
							'relative whitespace-nowrap px-2 py-1 after:content-["_"] after:absolute after:z-10 after:-bottom-0.5 after:left-0 after:h-px after:w-full after:rounded-full'
						)}
					>
						{tag}
					</Link>
				))}
			</nav>
		</div>
	);
}
