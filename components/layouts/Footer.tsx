import { getLatestCommit } from '@/lib/github';
import CustomLink from '../blog/Link';
import { Icon } from '../ui/Icon';
import { cn } from '@/lib/utils';

export default async function Footer() {
	const commitInfo = await getLatestCommit();

	return (
		<footer
			className={cn(
				'max-w-3xl w-full mx-auto mt-auto flex flex-col justify-between gap-y-4 p-6',
				'border-t border-dashed text-foreground-tertiary text-xs',
				'sm:flex-row sm:items-center sm:border-t-0'
			)}
		>
			<div>
				<span>Thanks for visiting!</span>
				<span className="flex items-center gap-1">
					<Icon name="code" className="size-4" />
					Last commit:{' '}
					{commitInfo?.url ? (
						<CustomLink
							href={commitInfo.url}
							className="pb-1 mt-1 text-foreground-secondary hover:text-foreground font-mono before:h-px"
						>
							{commitInfo.sha?.slice(0, 7)}
						</CustomLink>
					) : (
						<span className="pb-1 mt-1 font-mono">N/A</span>
					)}
				</span>
			</div>

			<div className="sm:text-right space-y-1">
				<span className="block">© {new Date().getFullYear()} Simon Nyström</span>
				<span className="block text-foreground-secondary">Built & designed in Stockholm</span>
			</div>
		</footer>
	);
}
