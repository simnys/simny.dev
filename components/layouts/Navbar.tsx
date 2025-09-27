'use client';

import { navItems } from '@/data/navigation';
import { IconAt, IconMenu, Logo } from '@/data/icons';
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

export default function Navbar({ className }: { className?: string }) {
	const [openMobile, setOpenMobile] = useState(false);
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);
	const currentPath = usePathname();

	const handleDropdownToggle = (dropdownId: string) => {
		setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
	};

	return (
		<header role="menubar" className={cn('navbar max-h-screen sticky top-0 z-99', className)}>
			<nav
				aria-label="Main navigation"
				className={cn(
					'relative h-13 flex items-center w-full px-2 mx-auto border-b lg:border bg-background'
				)}
			>
				<div className="min-w-15 flex items-center justify-start">
					<Link
						href="/"
						className={cn(
							'w-fit p-2 rounded-lg',
							' text-foreground-secondary ring-1 ring-transparent ring-offset-background',
							'transition-all hover:text-foreground hover:ring-brand hover:ring-offset-2'
						)}
					>
						<Logo width={20} height={20} className="" />
					</Link>
				</div>

				<div className="relative flex w-full h-full justify-center items-center text-foreground-secondary/80 text-sm font-medium tracking-normal">
					{navItems.navigationLinks.map((navItem, idx) => (
						<Link
							key={`navItem-${idx}`}
							href={navItem.path}
							onMouseOver={() => setOpenDropdown(null)}
							className={cn(
								'hidden sm:block text-center px-4 py-2 rounded-lg hover:text-foreground hover:bg-foreground-secondary/5 dark:hover:bg-foreground-secondary/10 transition-colors',
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
							'hidden sm:block text-center px-4 py-2 rounded-lg hover:text-foreground hover:bg-foreground-secondary/5 dark:hover:bg-foreground-secondary/10 transition-colors',
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
					className="min-w-15 flex items-center justify-end gap-2"
					onMouseOver={() => setOpenDropdown(null)}
				>
					<Tooltip message="Theme">
						<ThemeSwitcher
							className={cn(
								'w-fit p-2 my-1 rounded-lg',
								' text-foreground-secondary ring-1 ring-transparent ring-offset-background',
								'transition-all hover:text-foreground hover:ring-brand hover:ring-offset-2'
							)}
						/>
					</Tooltip>

					<Tooltip message="Contact" className="hidden sm:flex">
						<Modal
							trigger={<IconAt width={18} height={18} />}
							triggerClassName={cn(
								'w-fit p-2 my-1 rounded-lg',
								'text-foreground-secondary ring-1 ring-transparent ring-offset-background',
								'transition-all hover:text-foreground hover:ring-brand hover:ring-offset-2'
							)}
						>
							<ContactModal />
						</Modal>
					</Tooltip>

					<button
						onClick={() => setOpenMobile(!openMobile)}
						aria-expanded={openMobile}
						aria-controls="sliding-menu"
						aria-label={openMobile ? 'Close menu' : 'Open menu'}
						className={cn(
							'sm:hidden text-center p-2 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-foreground-secondary/5 dark:hover:bg-foreground-secondary/10 transition-colors',
							openMobile &&
								'text-foreground bg-foreground-secondary/5 dark:bg-foreground-secondary/10'
						)}
					>
						<IconMenu isOpen={openMobile} />
					</button>
					<span className="sr-only">{openMobile ? 'Close menu' : 'Open menu'}</span>
				</div>

				<AnimatePresence>
					{openMobile && (
						<MobileMenu isOpen={openMobile} setIsOpen={setOpenMobile} currentPath={currentPath} />
					)}
				</AnimatePresence>
			</nav>
		</header>
	);
}
