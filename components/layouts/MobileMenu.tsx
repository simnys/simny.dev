import { navItems } from '@/data/navigation';
import { motion } from 'framer-motion';

import MenuItem from '../ui/MenuItem';
import { useScrollLock } from '@/lib/hooks';

interface MobileMenuProps {
	className?: string;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	currentPath: string;
}

export default function MobileMenu({ currentPath, isOpen, setIsOpen, className }: MobileMenuProps) {
	useScrollLock(isOpen);

	return (
		<>
			<motion.div
				key="sidebar"
				id="sidebar"
				initial={{ translateX: '-100%' }}
				animate={{ translateX: 0 }}
				exit={{ translateX: '-100%' }}
				transition={{ type: 'spring', stiffness: 200, damping: 24 }}
				aria-expanded={isOpen}
				aria-label="Mobile navigation"
				className="sm:hidden min-w-[300px] fixed top-14 bottom-0 left-0 rounded-tr-xl border bg-background-secondary shadow-xs will-change-transform overflow-hidden overflow-y-scroll z-100"
			>
				<div className="flex flex-col h-full pt-6 pb-8 px-3">
					<MenuSection
						title="Menu"
						items={navItems.navigationLinks}
						onClose={() => setIsOpen(false)}
						currentPath={currentPath}
					/>

					<MenuSection
						title="Misc"
						items={navItems.exploreLinks}
						onClose={() => setIsOpen(false)}
						currentPath={currentPath}
					/>

					<MenuSection
						title="Connect"
						items={navItems.connectLinks}
						onClose={() => setIsOpen(false)}
						currentPath={currentPath}
					/>
				</div>
			</motion.div>

			<motion.div
				key="overlay"
				initial={{ opacity: 0 }}
				animate={{ opacity: 100 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.2 }}
				aria-hidden={true}
				className="sm:hidden fixed top-0 left-0 right-0 bottom-0 bg-background/80 backdrop-blur-md z-99 pointer-events-none"
			/>
		</>
	);
}

const MenuSection = ({
	title,
	items,
	onClose,
	currentPath,
}: {
	title: string;
	items: any[];
	onClose: () => void;
	currentPath: string;
}) => {
	return (
		<>
			<span className="font-mono tracking-tighter text-foreground-tertiary mb-1 px-3">{title}</span>
			<div className="flex flex-col mb-4">
				{items.map((navItem, idx) => (
					<MenuItem
						key={idx}
						navItem={navItem}
						onClose={onClose}
						isCurrentPath={`/${currentPath.split('/')[1]}` == navItem.path}
					/>
				))}
			</div>
		</>
	);
};
