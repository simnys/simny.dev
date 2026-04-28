'use client';

import { cn } from '@/lib/utils';
import { navigationLinks } from '@/data/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { IconName } from '@/lib/types/icons';
import { Icon } from '../ui/Icon';
import { FocusTrap } from 'focus-trap-react';

interface NavDropdownProps {
	isOpen: boolean;
	onClose: () => void;
	currentPath: string;
	className?: string;
}

function NavDropdown({ isOpen, onClose, currentPath, className }: NavDropdownProps) {
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

	const isActivePath = (path: string) => `/${currentPath.split('/')[1]}` === path;

	return (
		<FocusTrap
			focusTrapOptions={{
				initialFocus: false,
			}}
		>
			<motion.div
				ref={dropdownRef}
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.95 }}
				transition={{ duration: 0.15, ease: 'easeOut' }}
				role="menu"
				aria-label="More navigation options"
				className={cn(
					'hidden sm:block absolute top-13 left-4 right-4 rounded-xl p-2.5 z-50',
					'bg-background border shadow-xs will-change-transform origin-top',
					className,
				)}
			>
				<div
					onMouseLeave={onClose}
					className="w-full grid grid-cols-2 grid-rows-6 grid-flow-col gap-1 p-3 border rounded-lg shadow-xs bg-background-secondary overflow-hidden"
				>
					{navigationLinks.map((item) => (
						<NavDropDownCard
							key={item.name}
							title={item.name}
							description={item.description}
							href={item.path}
							icon={isActivePath(item.path) ? item.iconActive : item.icon}
							colSpan={1}
							rowSpan={item.rowSpan}
							onClose={onClose}
							className={
								isActivePath(item.path)
									? 'text-foreground border-border bg-background-secondary'
									: undefined
							}
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
	colSpan = 6,
	rowSpan = 1,
	className,
}: NavDropDownCardProps) {
	const isClickable = !!href;

	const handleClick = () => {
		if (isClickable) {
			onClose();
		}
	};

	const commonClassName = cn(
		'relative text-sm text-foreground-secondary p-3 overflow-hidden rounded-lg border border-dashed border-transparent',
		'hover:bg-background-tertiary hover:border-border hover:text-foreground focus-visible:text-foreground transition-colors duration-200 ease-out group',
		isClickable ? 'cursor-pointer' : 'cursor-default',
		className,
	);

	const commonStyle = {
		gridColumn: `span ${colSpan}`,
		gridRow: `span ${rowSpan}`,
	};

	const content = (
		<div className={cn('flex gap-x-2 h-full', rowSpan > 1 ? 'flex-col h-full' : 'items-center')}>
			<div className="flex items-center gap-1.5">
				{icon && <Icon name={icon} className="size-4" />}
				<h3 className="tracking-normal z-20 relative">{title}</h3>
			</div>

			{description && (
				<p
					className={cn(
						'text-xs text-foreground-tertiary text-balance',
						rowSpan === 1 ? 'truncate' : 'mt-1',
						colSpan >= 6 && rowSpan > 1 && 'w-2/3',
					)}
				>
					{description}
				</p>
			)}

			{!isClickable && (
				<div className="absolute top-2 right-2 text-[12px] rounded-lg px-4 py-0.5 backdrop-blur-lg border border-brand/25 text-brand bg-brand/10 z-10 w-fit">
					In progress
				</div>
			)}
		</div>
	);

	if (isClickable) {
		return (
			<Link href={href} onClick={handleClick} className={commonClassName} style={commonStyle}>
				{content}
			</Link>
		);
	}

	return (
		<div className={commonClassName} style={commonStyle}>
			{content}
		</div>
	);
}

export { NavDropdown, NavDropDownCard };
