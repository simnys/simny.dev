'use client';

import { cn } from '@/lib/utils';
import { dropdownLinks } from '@/data/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import CardOverlay from '../ui/CardOverlay';
import { IconName } from '@/lib/types/icons';
import { Icon } from '../ui/Icon';
import { FocusTrap } from 'focus-trap-react';

interface NavDropdownProps {
	isOpen: boolean;
	onClose: () => void;
	className?: string;
}

function NavDropdown({ isOpen, onClose, className }: NavDropdownProps) {
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Handle click outside and escape key
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
			document.addEventListener('keydown', handleKeyDown);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen, onClose]);

	return (
		<FocusTrap
			focusTrapOptions={{
				initialFocus: false,
				clickOutsideDeactivates: true,
			}}
		>
			<motion.div
				ref={dropdownRef}
				initial={{ opacity: 0, scale: 0.95, y: -10 }}
				animate={{ opacity: 1, scale: 1, y: 0 }}
				exit={{ opacity: 0, scale: 0.95, y: -10 }}
				transition={{ duration: 0.15, ease: 'easeOut' }}
				role="menu"
				aria-label="Explore menu"
				className={cn(
					'hidden sm:block absolute top-15 w-screen md:w-full rounded-2xl p-2',
					'bg-background border shadow-sm will-change-transform',
					className
				)}
			>
				<div
					onMouseLeave={onClose}
					className="w-full grid grid-cols-12 auto-rows-fr border rounded-xl shadow-xs bg-background-secondary divide-x divide-y overflow-hidden"
				>
					{dropdownLinks.map((item) => (
						<NavDropDownCard
							key={item.name}
							title={item.name}
							description={item.description}
							href={item.path}
							icon={item.icon}
							colSpan={item.colSpan}
							rowSpan={item.rowSpan}
							onClose={onClose}
						/>
					))}
				</div>
			</motion.div>
		</FocusTrap>
	);
}

interface NavDropDownCardProps {
	title: string;
	description?: string;
	icon?: IconName;
	href?: string;
	onClose: () => void;
	colSpan?: number;
	rowSpan?: number;
	className?: string;
}

function NavDropDownCard({
	title,
	description,
	icon,
	onClose,
	href = '',
	colSpan = 4,
	rowSpan = 1,
	className,
}: NavDropDownCardProps) {
	const isClickable = !!href;

	const handleClick = () => {
		if (isClickable) {
			onClose();
		}
	};

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleClick();
		}
	};

	const commonClassName = cn(
		'relative text-sm font-medium text-foreground p-4 overflow-hidden',
		'hover:bg-background-secondary transition-colors group',
		isClickable ? 'cursor-pointer' : 'cursor-default',
		className
	);

	const commonStyle = {
		gridColumn: `span ${colSpan}`,
		gridRow: `span ${rowSpan}`,
	};

	const content = (
		<>
			<div className={cn('flex gap-x-2', rowSpan > 1 ? 'flex-col h-full' : 'items-center')}>
				<div className="flex items-center gap-2">
					{icon && <Icon name={icon} aria-hidden="true" />}
					<h3 className="tracking-normal z-20 relative">{title}</h3>
				</div>

				{description && (
					<p
						className={cn(
							'text-[13px] text-foreground-secondary',
							rowSpan === 1 ? 'truncate' : 'mt-1',
							colSpan >= 6 && rowSpan > 1 && 'w-1/2'
						)}
					>
						{description}
					</p>
				)}

				{!isClickable && (
					<div className="absolute top-2 right-2 text-xs rounded-md px-4 py-0.5 backdrop-blur-lg border border-brand/20 text-brand/80 bg-brand/10 z-10 w-fit">
						Upcoming
					</div>
				)}
			</div>

			{icon && rowSpan > 1 && (
				<Icon
					name={icon}
					className="w-80 h-80 absolute -bottom-12 -right-12 -rotate-12 text-foreground-secondary/5 dark:text-black/20 transition-colors duration-300 pointer-events-none select-none"
					aria-hidden="true"
				/>
			)}

			<CardOverlay withIcon={isClickable} />
		</>
	);

	if (isClickable) {
		return (
			<Link href={href} onClick={handleClick} className={commonClassName} style={commonStyle}>
				{content}
			</Link>
		);
	}

	return (
		<div
			role="menuitem"
			tabIndex={0}
			onKeyDown={handleKeyDown}
			className={commonClassName}
			style={commonStyle}
		>
			{content}
		</div>
	);
}

export { NavDropdown, NavDropDownCard };
