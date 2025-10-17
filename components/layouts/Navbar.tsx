'use client';

import { navItems } from '@/data/navigation';
import { cn } from '@/lib/utils';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useCallback, useRef, useEffect } from 'react';

import ThemeSwitcher from '../ui/ThemeSwitcher';
import { Tooltip } from '../ui/Tooltip';
import MobileMenu from './MobileMenu';
import { NavDropdown } from './NavDropdown';
import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';

export default function Navbar() {
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const currentPath = usePathname();
	const navRef = useRef<HTMLElement>(null);

	const toggleMobileMenu = useCallback(() => {
		setIsMobileOpen((prev) => !prev);
		setIsDropdownOpen(false);
	}, []);
	const closeMobileMenu = useCallback(() => {
		setIsMobileOpen(false);
	}, []);

	const handleDropdownToggle = useCallback(() => {
		setIsDropdownOpen((prev) => !prev);
		setIsMobileOpen(false);
	}, []);
	const closeDropdown = useCallback(() => {
		setIsDropdownOpen(false);
	}, []);

	// Close menus on esc
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				closeMobileMenu();
				closeDropdown();
			}
		};
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, []);

	const isActivePath = (path: string) => `/${currentPath.split('/')[1]}` === path;

	return (
		<header>
			<nav
				ref={navRef}
				aria-label="Main navigation"
				className="relative h-13 flex items-center w-full px-2 max-w-3xl mx-auto bg-background"
			>
				{/* Logo */}
				<div className="min-w-15 flex items-center justify-start z-100">
					<Link
						href="/"
						className="w-fit p-2 rounded-lg text-foreground-secondary hover:text-foreground transition-colors"
						aria-label="Home"
					>
						SIMNY
					</Link>
				</div>

				{/* Desktop Navigation */}
				<div className="z-100 flex w-full h-full justify-center items-center text-sm font-medium">
					{navItems.navigationLinks.map((navItem) => (
						<Link
							key={navItem.path}
							href={navItem.path}
							onMouseEnter={closeDropdown}
							className={cn(
								'hidden sm:block text-center px-4 py-2 rounded-lg',
								'text-foreground-tertiary hover:text-foreground hover:bg-background-tertiary',
								'transition-colors duration-200 ease-out',
								isActivePath(navItem.path) && 'text-foreground'
							)}
						>
							{navItem.name}
						</Link>
					))}

					<button
						onMouseEnter={() => setIsDropdownOpen(true)}
						onClick={handleDropdownToggle}
						aria-expanded={isDropdownOpen}
						aria-haspopup="true"
						className={cn(
							'hidden sm:block text-center px-4 py-2 rounded-lg',
							'text-foreground-tertiary hover:text-foreground hover:bg-background-tertiary',
							'transition-colors duration-200 ease-out',
							isDropdownOpen && 'text-foreground bg-background-tertiary'
						)}
					>
						More
					</button>
				</div>

				<AnimatePresence>
					{isDropdownOpen && (
						<NavDropdown
							isOpen={isDropdownOpen}
							onClose={closeDropdown}
							currentPath={currentPath}
						/>
					)}
				</AnimatePresence>

				{/* Actions */}
				<div className="flex items-center justify-end gap-2 z-100" onMouseEnter={closeDropdown}>
					<Tooltip message="Change theme" placement="bottom">
						<ThemeSwitcher />
					</Tooltip>

					<Button
						onClick={toggleMobileMenu}
						aria-expanded={isMobileOpen}
						aria-controls="mobile-menu"
						aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
						variant="ghost"
						isActive={isMobileOpen}
						size="icon"
						className="relative sm:hidden"
					>
						<Icon
							name="menuClosed"
							className={cn(
								'absolute transition-opacity duration-200 ease-out',
								isMobileOpen && 'opacity-0'
							)}
							aria-hidden="true"
						/>
						<Icon
							name="menuOpen"
							className={cn(
								'absolute transition-opacity duration-200 ease-out opacity-0',
								isMobileOpen && 'opacity-100'
							)}
							aria-hidden="true"
						/>
					</Button>
				</div>

				{/* Mobile Menu */}
				<AnimatePresence>
					{isMobileOpen && (
						<MobileMenu isOpen={isMobileOpen} onClose={closeMobileMenu} currentPath={currentPath} />
					)}
				</AnimatePresence>
			</nav>
		</header>
	);
}
