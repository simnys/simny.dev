'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState, useCallback, useRef, useEffect } from 'react';

import ThemeSwitcher from '../ui/ThemeSwitcher';
import MobileMenu from './MobileMenu';
import { NavDropdown } from './NavDropdown';
import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';
import Link from 'next/link';

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

	return (
		<header>
			<nav
				ref={navRef}
				aria-label="Main navigation"
				className="relative h-13 flex items-center w-full px-2 sm:px-6 max-w-3xl mx-auto bg-background"
			>
				{/* Logo */}
				<div className="flex items-center justify-start z-100">
					<Link
						href="/"
						className="size-7 rounded-full bg-gradient-to-tl from-brand to-pink-100 shadow-inner"
						aria-label="Home"
					></Link>
				</div>

				{/* Desktop Navigation */}
				<div className="flex w-full h-full justify-center items-center" />

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
					<ThemeSwitcher />

					<Button
						onClick={handleDropdownToggle}
						aria-expanded={isDropdownOpen}
						aria-haspopup="true"
						variant="ghost"
						isActive={isDropdownOpen}
						size="icon"
						className={cn('relative hidden sm:flex')}
					>
						<Icon
							name="gridOutline"
							className={cn(
								'absolute transition-opacity duration-200 ease-out',
								isDropdownOpen && 'opacity-0',
							)}
							aria-hidden="true"
						/>
						<Icon
							name="gridFilled"
							className={cn(
								'absolute transition-opacity duration-200 ease-out opacity-0',
								isDropdownOpen && 'opacity-100',
							)}
							aria-hidden="true"
						/>
					</Button>

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
								isMobileOpen && 'opacity-0',
							)}
							aria-hidden="true"
						/>
						<Icon
							name="menuOpen"
							className={cn(
								'absolute transition-opacity duration-200 ease-out opacity-0',
								isMobileOpen && 'opacity-100',
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
