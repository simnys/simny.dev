import { cn } from '@/lib/utils';

export default function Divider({ className }: { className?: string }) {
	return (
		<div
			className={cn(`my-12 sm:my-16 flex w-full items-center justify-center gap-2`, className)}
			aria-hidden="true"
		>
			<div className="size-1.5 rounded-full bg-foreground-tertiary/30" />
			<div className="size-1.5 rounded-full bg-foreground-tertiary/30" />
			<div className="size-1.5 rounded-full bg-foreground-tertiary/30" />
			<div className="size-1.5 rounded-full bg-foreground-tertiary/30" />
		</div>
	);
}
