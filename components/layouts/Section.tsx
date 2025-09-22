import { IconArrow } from '@/data/icons';
import { cn } from '@/lib/utils';
import Link from 'next/link';

import React, { ReactNode } from 'react';

interface SectionProps {
	children: ReactNode;
	className?: string;
}

export const Section: React.FC<SectionProps> = ({ children, className }) => (
	<section className={cn('w-full flex flex-col pb-20 sm:pb-30', className)}>{children}</section>
);

interface SectionHeaderProps {
	title: string;
	subtitle?: string;
	linkHref?: string;
	className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
	title,
	subtitle,
	linkHref,
	className,
}) => (
	<div className={cn('relative text-center border-y mb-5 pb-1 px-4 text-xl', className)}>
		<span className="text-sm font-medium text-brand">{subtitle}</span>
		<h2>{title}</h2>

		{linkHref && (
			<Link
				href={linkHref}
				className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-foreground-secondary/5 text-foreground-secondary ring-1 ring-transparent ring-offset-background transition-all hover:bg-foreground-secondary/10 hover:text-foreground hover:ring-brand hover:ring-offset-2"
			>
				<IconArrow className="w-4 h-4" />
			</Link>
		)}
	</div>
);
