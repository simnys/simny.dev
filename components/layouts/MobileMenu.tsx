import { navigationLinks } from '@/data/navigation';
import { motion } from 'framer-motion';
import { useScrollLock } from '@/lib/hooks';
import { FocusTrap } from 'focus-trap-react';
import { Icon } from '../ui/Icon';
import { cn } from '@/lib/utils';
import { NavItem } from '@/lib/types/types';
import Link from 'next/link';

interface MobileMenuProps {
	isOpen: boolean;
	onClose: () => void;
	currentPath: string;
}

// Animation variants
const menuVariants = {
	hidden: { x: '-100%' },
	visible: {
		x: 0,
		transition: { type: 'spring', stiffness: 200, damping: 24 },
	},
	exit: {
		x: '-100%',
		transition: { type: 'spring', stiffness: 200, damping: 24 },
	},
};

const overlayVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
	exit: { opacity: 0 },
};

export default function MobileMenu({ isOpen, onClose, currentPath }: MobileMenuProps) {
	useScrollLock(isOpen);
	const isActivePath = (path: string) => `/${currentPath.split('/')[1]}` === path;

	return (
		<>
			<FocusTrap
				focusTrapOptions={{
					initialFocus: false,
					clickOutsideDeactivates: true,
				}}
			>
				<motion.div
					id="mobile-menu"
					role="dialog"
					aria-modal="true"
					aria-label="Mobile navigation menu"
					variants={menuVariants}
					initial="hidden"
					animate="visible"
					exit="exit"
					className={cn(
						'sm:hidden min-w-75 fixed top-14 bottom-0 left-0',
						'rounded-tr-xl border bg-background-secondary shadow-xs',
						'will-change-transform overflow-hidden overflow-y-auto z-100',
					)}
				>
					<nav className="flex flex-col h-full py-6 px-3">
						<span className="text-sm text-foreground-tertiary mb-4 px-3">Menu</span>
						<ul className="flex flex-col" role="group">
							{navigationLinks.map((item) => (
								<li key={item.path}>
									<MenuItem item={item} onClose={onClose} isActive={isActivePath(item.path)} />
								</li>
							))}
						</ul>
					</nav>
				</motion.div>
			</FocusTrap>

			<motion.div
				variants={overlayVariants}
				initial="hidden"
				animate="visible"
				exit="exit"
				transition={{ duration: 0.2 }}
				onClick={onClose}
				onKeyDown={(e) => e.key === 'Escape' && onClose()}
				aria-hidden="true"
				className="sm:hidden fixed inset-0 bg-background/80 backdrop-blur-md z-99 cursor-pointer"
			/>
		</>
	);
}

interface MenuItemProps {
	item: NavItem;
	onClose: () => void;
	isActive: boolean;
}

const MenuItem = ({ item, onClose, isActive }: MenuItemProps) => {
	return (
		<Link
			href={item.path}
			onClick={onClose}
			onKeyDown={(e) => e.key === 'Enter' && onClose()}
			className={cn(
				'relative flex items-center gap-x-2 px-3 py-3 rounded-lg text-sm text-foreground-secondary',
				isActive && 'text-foreground bg-background-tertiary font-medium',
			)}
			aria-current={isActive ? 'page' : undefined}
		>
			{item.icon && <Icon name={item.icon} className="size-4 shrink-0" aria-hidden="true" />}
			<span className="truncate">{item.name}</span>
		</Link>
	);
};
