import { cn } from '@/lib/utils';
import CustomLink from '../blog/Link';

interface PageHeaderProps {
	title: string;
	content?: string;
	backlink?: string;
	className?: string;
	backlinkClassName?: string;
}

export default function PageHeader({
	title,
	content,
	backlink,
	className,
	backlinkClassName,
}: PageHeaderProps) {
	return (
		<>
			<div className={cn('relative mt-12 sm:mt-20 space-y-1 text-balance', className)}>
				<h1>{title}</h1>
				{content && <p className="text-foreground-secondary">{content}</p>}
			</div>
			{backlink && (
				<CustomLink
					href={backlink}
					icon="external"
					flipIcon
					className={cn(
						'absolute left-5 top-6 sm:top-12 text-[15px] text-foreground-tertiary hover:text-foreground no-underline',
						backlinkClassName,
					)}
				>
					{backlink.split('/')[1].charAt(0).toUpperCase() + backlink.split('/')[1].slice(1)}
				</CustomLink>
			)}
		</>
	);
}
