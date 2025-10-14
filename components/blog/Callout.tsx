import { cn } from '@/lib/utils';
import { Icon } from '../ui/Icon';
import { IconName } from '@/lib/types/icons';

type CalloutVariants = 'info' | 'success' | 'thought' | 'warning' | 'ignore';
interface CalloutProps {
	variant?: CalloutVariants;
	title?: string;
	children: React.ReactNode;
}

const variantConfig: Record<CalloutVariants, IconName | undefined> = {
	info: 'info',
	success: 'check',
	thought: 'chat',
	warning: 'warning',
	ignore: undefined,
};

const variantStyles: Record<CalloutVariants, { border: string; bg: string; text: string }> = {
	info: {
		border: 'border-[#2e68ef]/25 dark:border-[#6694ff]/25',
		bg: 'bg-[#2e68ef]/10 dark:bg-[#6694ff]/10',
		text: 'text-[#2e68ef] dark:text-[#6694ff]',
	},
	success: {
		border: 'border-[#3d7150]/25 dark:border-[#63c981]/25',
		bg: 'bg-[#3d7150]/10 dark:bg-[#63c981]/10',
		text: 'text-[#3d7150] dark:text-[#63c981]',
	},
	thought: {
		border: 'border-[#5f38ca]/25 dark:border-[#8978d6]/25',
		bg: 'bg-[#5f38ca]/10 dark:bg-[#8978d6]/10',
		text: 'text-[#5f38ca] dark:text-[#8978d6]',
	},
	warning: {
		border: 'border-[#a53f47]/25 dark:border-[#e06c76]/25',
		bg: 'bg-[#a53f47]/10 dark:bg-[#e06c76]/10',
		text: 'text-[#a53f47] dark:text-[#e06c76]',
	},
	ignore: {
		border: 'border-border',
		bg: 'bg-background',
		text: 'text-foreground-secondary',
	},
};

export default function Callout({ variant = 'info', title, children }: CalloutProps) {
	const icon = variantConfig[variant];
	const styles = variantStyles[variant];

	return (
		<div className="relative py-10 my-4 -mx-6 px-4 lg:-mx-30 lg:px-16 border-y border-border/50">
			<blockquote
				className={cn(
					'not-prose relative z-10 p-4 py-6 md:px-8 rounded-xl border shadow-xs max-w-3xl mx-auto w-full bg-background',
					styles.text
				)}
			>
				{variant !== 'ignore' && icon && (
					<div className="mb-2 flex gap-x-3 items-center font-medium">
						<div className={cn('p-2 rounded-lg', styles.bg)}>
							<Icon name={icon} className={cn('shrink-0', styles.text)} />
						</div>
						<div className="grow not-prose">
							{title ? title : variant.charAt(0).toUpperCase() + variant.slice(1)}
						</div>
					</div>
				)}
				<div className="px-1 not-prose text-foreground-secondary">{children}</div>
			</blockquote>

			<div
				className={cn(
					'absolute inset-0 pointer-events-none',
					'bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:24px_24px]',
					'dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]'
				)}
				style={{
					WebkitMaskImage: 'radial-gradient(circle at 50% 50%, white 50%, transparent 100%)',
					maskImage: 'radial-gradient(circle at 50% 50%, white 50%, transparent 100%)',
				}}
			/>
		</div>
	);
}
