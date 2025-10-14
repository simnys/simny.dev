import { cn } from '@/lib/utils';
import { Icon } from './Icon';

interface CardOverlayProps {
	withOverlay?: boolean;
	withIcon?: boolean;
	className?: string;
}

export default function CardOverlay({
	withOverlay = true,
	withIcon = false,
	className,
}: CardOverlayProps) {
	return (
		<>
			{withOverlay && (
				<div
					className={cn(
						'absolute inset-0 z-10 bg-gradient-to-tl from-brand/20 via-transparent to-transparent',
						'opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 user-select-none pointer-events-none',
						className
					)}
				/>
			)}

			{withIcon && (
				<div
					className={cn(
						'absolute right-4 -bottom-2 z-20 w-fit h-fit rounded-full p-2',
						'bg-background text-foreground-secondary backdrop-blur-md',
						'opacity-0 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:-translate-y-5 user-select-none pointer-events-none '
					)}
				>
					<Icon name="external" className="w-4 h-4" />
				</div>
			)}
		</>
	);
}
