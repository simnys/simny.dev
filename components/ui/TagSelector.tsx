import { cn, slugify } from '@/lib/utils';
import Link from 'next/link';

interface TagSelectorProps {
	tags: string[];
	activeTag: string;
}

export function TagSelector({ tags, activeTag }: TagSelectorProps) {
	return (
		<div className="px-2 sm:px-6 -mx-6 border-b">
			<nav
				className="flex gap-x-1 font-medium text-sm tracking-normal overflow-x-auto no-scrollbar mask-[linear-gradient(to_right,white_90%,transparent)]"
				id="blog-tags"
			>
				<Link
					href="/blog"
					aria-current={!activeTag ? 'page' : undefined}
					className={cn(
						!activeTag
							? 'border-brand text-brand'
							: 'border-transparent text-foreground-tertiary transition-colors hover:border-foreground hover:text-foreground',
						'whitespace-nowrap border-b p-2'
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
								? 'border-brand text-brand'
								: 'border-transparent text-foreground-tertiary transition-colors hover:border-foreground hover:text-foreground',
							'whitespace-nowrap border-b p-2'
						)}
					>
						{tag}
					</Link>
				))}
			</nav>
		</div>
	);
}
