import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
	children: ReactNode;
	className?: string;
}

export const Section: React.FC<SectionProps> = ({ children, className }) => (
	<section className={cn('flex flex-col', className)}>{children}</section>
);

interface SectionHeaderProps {
	title: string;
	subtitle?: string;
	className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, className }) => (
	<div className={cn('relative mb-4', className)}>
		<span className="font-serif text-foreground-tertiary">{subtitle}</span>
		<h2>{title}</h2>
	</div>
);
