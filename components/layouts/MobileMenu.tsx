import { navItems } from '@/data/data';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

import ContactModal from '../sections/ContactModal';
import MenuItem from '../ui/MenuItem';
import Modal from '../ui/Modal';

interface MobileMenuProps {
	className?: string;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	currentPath: string;
}

export default function MobileMenu({ currentPath, isOpen, setIsOpen, className }: MobileMenuProps) {
	return (
		<motion.div
			initial={{ opacity: 0, height: 0 }}
			animate={{ opacity: 1, height: 'auto' }}
			exit={{ opacity: 0, height: 0 }}
			transition={{ duration: 0.2, ease: 'easeOut' }}
			aria-expanded={isOpen}
			aria-label="Mobile navigation"
			className="sm:hidden absolute top-13 left-0 right-0 border-b rounded-b-xl bg-background/90 backdrop-blur-lg shadow-xs will-change-transform overflow-hidden"
		>
			<div className="flex flex-col h-full pt-6">
				<h5 className="text-xs tracking-normal text-foreground-secondary px-4 pb-1 mb-1 border-b">
					Navigate
				</h5>
				<div className="flex flex-col mb-6">
					{navItems.navigationLinks.map((navItem, idx) => (
						<MenuItem
							key={idx}
							navItem={navItem}
							idx={idx}
							setIsOpen={setIsOpen}
							isCurrentPath={`/${currentPath.split('/')[1]}` == navItem.path}
						/>
					))}
				</div>
				<h5 className="text-xs tracking-normal text-foreground-secondary px-4 pb-1 mb-1 border-b">
					Explore
				</h5>
				<div className="flex flex-col mb-6">
					{navItems.exploreLinks
						.filter((item) => item.path)
						.map((navItem, idx) => (
							<MenuItem
								key={idx}
								navItem={navItem}
								idx={idx}
								setIsOpen={setIsOpen}
								isCurrentPath={`/${currentPath.split('/')[1]}` == navItem.path}
							/>
						))}
				</div>

				<h5 className="text-xs tracking-normal text-foreground-secondary px-4 pb-1 mb-1 border-b">
					Connect
				</h5>
				<div className="flex flex-col mb-6">
					{navItems.connectLinks.map((navItem, idx) =>
						navItem.name === 'Contact' ? (
							<Modal
								key={idx}
								trigger={
									<MenuItem
										as="div"
										navItem={navItem}
										idx={idx}
										setIsOpen={setIsOpen}
										isCurrentPath={`/${currentPath.split('/')[1]}` == navItem.path}
									/>
								}
								triggerClassName="text-left"
							>
								<ContactModal />
							</Modal>
						) : (
							<MenuItem
								key={idx}
								navItem={navItem}
								idx={idx}
								setIsOpen={setIsOpen}
								isCurrentPath={`/${currentPath.split('/')[1]}` == navItem.path}
							/>
						)
					)}
				</div>

				<div className={cn('flex items-center gap-x-5 py-2 px-4 border-t w-full bg-background/20')}>
					{navItems.socialLinks.map((navItem, idx) => (
						<a
							key={idx}
							href={navItem.path}
							target="_blank"
							rel="noopener noreferrer"
							className="p-2 text-foreground-secondary"
						>
							{navItem.icon ? <navItem.icon /> : null}
						</a>
					))}
				</div>
			</div>
		</motion.div>
	);
}
