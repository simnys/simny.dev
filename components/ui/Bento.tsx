import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

function BentoGrid({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			className={cn(
				'min-h-120 grid grid-cols-1 md:grid-cols-12 md:auto-rows-fr gap-y-3 md:gap-y-0 px-2 md:px-0 outline-none md:divide-x md:divide-y border-y',
				className
			)}
			{...props}
		></div>
	);
}

interface BentoCardProps {
	href: string;
	colSpan: number;
	rowSpan: number;
	containerClassName?: string;
	className?: string;
	children: React.ReactNode;
}

const BentoCard = ({
	href,
	colSpan,
	rowSpan,
	containerClassName,
	className,
	children,
}: BentoCardProps) => {
	return (
		<div
			className={containerClassName}
			style={{
				gridColumn: `span ${colSpan}`,
				gridRow: `span ${rowSpan}`,
			}}
		>
			<Link
				href={href}
				className={cn(
					'relative flex h-full w-full p-4 rounded-2xl md:rounded-3xl overflow-hidden group',
					'bg-background-secondary/60 ring-1 ring-border ',
					'transition-colors hover:bg-background-secondary/20 dark:hover:bg-background-secondary',
					className
				)}
			>
				{children}
			</Link>
		</div>
	);
};

export { BentoCard, BentoGrid };
