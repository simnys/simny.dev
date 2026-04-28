import { getLatestCommit } from '@/lib/github';
import CustomLink from '../blog/Link';
import { Icon } from '../ui/Icon';
import { cn } from '@/lib/utils';
import { APP_VERSION } from '@/data/constants';

export default async function Footer() {
	const commitInfo = await getLatestCommit();

	return (
		<footer
			className={cn(
				'max-w-3xl w-full mx-auto mt-auto flex flex-col justify-between gap-y-1 p-6',
				'border-t border-dashed text-foreground-tertiary text-xs',
				'sm:flex-row sm:items-center sm:border-t-0 sm:pb-12',
			)}
		>
			<div>
				<span className="font-[450]">v{APP_VERSION} </span>
			</div>
			<div className="flex items-center gap-1">
				{commitInfo?.url && (
					<CustomLink
						icon="commit"
						href={commitInfo.url}
						className="pb-1 font-code text-foreground-secondary hover:text-foreground before:h-px"
					>
						{commitInfo.sha?.slice(0, 7)}
					</CustomLink>
				)}
			</div>
		</footer>
	);
}
