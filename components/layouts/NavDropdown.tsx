'use client';

import { useFocusTrap } from '@/lib/hooks';
import { cn } from '@/lib/utils';

import { dropdownLinks } from '@/data/data';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ComponentType, SVGProps } from 'react';
import CardOverlay from '../ui/CardOverlay';

interface NavDropdown {
	isOpen: boolean;
	onClose: () => void;
	className?: string;
}

function NavDropdown({ isOpen, onClose, className }: NavDropdown) {
	const { focusRef } = useFocusTrap(isOpen, onClose, true);

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.95 }}
			transition={{ duration: 0.2 }}
			aria-expanded={isOpen}
			aria-label="Dropdown"
			className="hidden sm:block absolute top-15 w-screen md:w-full rounded-2xl p-2 bg-background border shadow-sm will-change-transform"
		>
			<div
				ref={focusRef}
				tabIndex={-1}
				onMouseLeave={onClose}
				className="w-full grid grid-cols-12 auto-rows-fr border rounded-xl shadow-xs outline-none bg-background-secondary divide-x divide-y overflow-hidden"
			>
				{dropdownLinks.map((item, idx) => (
					<NavDropDownCard
						key={item.name}
						title={item.name}
						description={item.description}
						href={item.path}
						icon={item.icon}
						colSpan={item.colSpan}
						rowSpan={item.rowSpan}
						onClose={onClose}
						className={cn(
							idx === 0
								? 'border-b-0'
								: (idx !== 0 || idx !== dropdownLinks.length - 1) && 'border-r-0'
						)}
					/>
				))}
			</div>
		</motion.div>
	);
}

interface NavDropDownCard {
	title: string;
	description?: string;
	icon?: ComponentType<SVGProps<SVGSVGElement>>;
	href?: string;
	onClose: () => void;
	colSpan?: number;
	rowSpan?: number;
	className?: string;
}

function NavDropDownCard({
	title,
	description,
	icon: Icon,
	onClose,
	href = '',
	colSpan = 4,
	rowSpan = 1,
	className,
}: NavDropDownCard) {
	return (
		<Link
			href={href || ''}
			onClick={!href ? undefined : onClose}
			className={cn(
				'relative text-sm font-medium text-foreground p-4 overflow-hidden',
				'hover:bg-background-secondary transition-colors group',
				!href && 'cursor-default',
				className
			)}
			style={{
				gridColumn: `span ${colSpan}`,
				gridRow: `span ${rowSpan}`,
			}}
		>
			<div className={cn('flex gap-x-2', rowSpan > 1 ? 'flex-col h-full' : 'items-center')}>
				<div className="flex items-center gap-2">
					{Icon && <Icon />}
					<h3 className="tracking-normal z-20 relative">{title}</h3>
				</div>
				{description && (
					<span
						className={cn(
							'text-[13px] text-foreground-secondary',
							rowSpan == 1 ? 'truncate' : 'mt-1',
							colSpan >= 6 && rowSpan > 1 && 'w-1/2'
						)}
					>
						{description}
					</span>
				)}
				{!href && (
					<div className="absolute top-2 right-2 text-xs rounded-md px-4 py-0.5 backdrop-blur-lg border border-brand/20 text-brand/80 bg-brand/10 z-10 w-fit">
						Upcoming
					</div>
				)}
			</div>
			{Icon && rowSpan > 1 && (
				<Icon
					className={cn(
						'w-80 h-80 absolute -bottom-12 -right-12 -rotate-12 text-foreground-secondary/5 dark:text-black/20',
						'transition-colors duration-300 pointer-events-none select-none'
					)}
				/>
			)}
			<CardOverlay withIcon={!!href} />
		</Link>
	);
}

export { NavDropdown, NavDropDownCard };
