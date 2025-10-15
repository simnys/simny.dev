'use client';

import { navItems } from '@/data/navigation';
import { cn } from '@/lib/utils';

import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import ContactModal from '../sections/ContactModal';
import Modal from '../ui/Modal';
import ThemeSwitcher from '../ui/ThemeSwitcher';
import { Tooltip } from '../ui/Tooltip';
import MobileMenu from './MobileMenu';
import { NavDropdown } from './NavDropdown';
import { Icon } from '../ui/Icon';
import { FocusTrap } from 'focus-trap-react';

export default function Navbar({ className }: { className?: string }) {
	const [openMobile, setOpenMobile] = useState(false);
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);
	const currentPath = usePathname();

	const handleDropdownToggle = (dropdownId: string) => {
		setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
	};

	return (
		<header role="menubar" className={cn('navbar max-h-screen', className)}>
			<FocusTrap
				active={openMobile}
				focusTrapOptions={{
					initialFocus: false,
					clickOutsideDeactivates: true,
					onDeactivate: () => setOpenMobile(false),
				}}
			>
				<nav
					aria-label="Main navigation"
					className={cn(
						'relative h-13 flex items-center w-full px-2 max-w-3xl mx-auto bg-background'
					)}
				>
					<div className="min-w-15 flex items-center justify-start z-100">
						<Link href="/" className={cn('w-fit p-2 rounded-lg', ' text-foreground-secondary')}>
							SIMNY
						</Link>
					</div>

					<div className="relative z-100 flex w-full h-full justify-center items-center text-foreground-secondary/80 text-sm font-medium tracking-normal">
						{navItems.navigationLinks.map((navItem, idx) => (
							<Link
								key={`navItem-${idx}`}
								href={navItem.path}
								onMouseOver={() => setOpenDropdown(null)}
								className={cn(
									'hidden sm:block text-center px-4 py-2 rounded-lg hover:text-foreground hover:bg-background-tertiary transition-colors duration-200 ease-out',
									`/${currentPath.split('/')[1]}` == navItem.path && 'text-foreground'
								)}
							>
								{navItem.name}
							</Link>
						))}
						<button
							onMouseOver={() => setOpenDropdown('explore')}
							onClick={() => handleDropdownToggle('explore')}
							className={cn(
								'hidden sm:block text-center px-4 py-2 rounded-lg hover:text-foreground hover:bg-background-tertiary transition-colors duration-200 ease-out',
								openDropdown === 'explore' && 'text-foreground'
							)}
						>
							Explore
						</button>

						<AnimatePresence>
							{openDropdown === 'explore' && (
								<>
									<NavDropdown
										isOpen={openDropdown === 'explore'}
										onClose={() => setOpenDropdown(null)}
									/>
								</>
							)}
						</AnimatePresence>
					</div>

					<div
						className="flex items-center justify-end gap-2 z-100"
						onMouseOver={() => setOpenDropdown(null)}
					>
						<Tooltip message="Theme">
							<ThemeSwitcher
								className={cn(
									'relative size-10 flex items-center justify-center rounded-lg cursor-pointer',
									' text-foreground-tertiary border border-transparent',
									'transition-all duration-200 ease-out hover:text-foreground hover:bg-background-tertiary active:scale-97 active:border-border active:shadow-inner'
								)}
							/>
						</Tooltip>

						<button
							onClick={() => setOpenMobile(!openMobile)}
							aria-expanded={openMobile}
							aria-controls="sidebar"
							aria-label={openMobile ? 'Close menu' : 'Open menu'}
							className={cn(
								'relative size-10 flex items-center justify-center sm:hidden rounded-lg text-foreground-tertiary border border-transparent cursor-pointer',
								'transition-all duration-200 ease-out hover:text-foreground hover:bg-background-tertiary active:scale-97 active:border-border active:shadow-inner',
								openMobile && 'text-foreground bg-background-secondary border-border shadow-inner'
							)}
						>
							<Icon
								name="menuClosed"
								className={cn(
									'absolute transition-opacity duration-200 ease-out',
									openMobile && 'opacity-0'
								)}
							/>
							<Icon
								name="menuOpen"
								className={cn(
									'absolute transition-opacity duration-200 ease-out opacity-0',
									openMobile && 'opacity-100'
								)}
							/>
						</button>
					</div>

					<AnimatePresence>
						{openMobile && (
							<MobileMenu isOpen={openMobile} setIsOpen={setOpenMobile} currentPath={currentPath} />
						)}
					</AnimatePresence>
				</nav>
			</FocusTrap>
		</header>
	);
}
