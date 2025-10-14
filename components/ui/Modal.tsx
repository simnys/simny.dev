'use client';

import { useFocusTrap, useIsMounted, useScrollLock } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
	trigger: React.ReactNode | string;
	children: React.ReactNode;
	containerClassName?: string;
	triggerClassName?: string;
	className?: string;
}

const Modal = ({
	trigger,
	children,
	containerClassName,
	triggerClassName,
	className,
}: ModalProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const { focusRef } = useFocusTrap(isOpen, () => setIsOpen(false), false);
	const mounted = useIsMounted();
	useScrollLock(isOpen);

	return (
		<>
			<ModalTrigger onOpen={() => setIsOpen(true)} className={triggerClassName}>
				{trigger}
			</ModalTrigger>

			{mounted &&
				createPortal(
					<AnimatePresence>
						{isOpen && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.2, ease: 'easeOut' }}
								aria-hidden={!isOpen}
								className={cn(
									'fixed inset-0 z-99 flex items-center justify-center bg-background/80 backdrop-blur-md'
								)}
								onClick={() => setIsOpen(false)}
							>
								<motion.div
									initial={{ scale: 0.9 }}
									animate={{ scale: 1 }}
									exit={{ scale: 0.9 }}
									transition={{ duration: 0.2, ease: 'easeOut' }}
									ref={focusRef}
									tabIndex={-1}
									aria-expanded={isOpen}
									className={cn(
										'fixed z-100 w-full max-w-lg grid flex-1 grid-cols-1 lg:grid-cols-[32px_1fr_32px] bg-background-secondary border',
										'outline-none',
										containerClassName
									)}
									onClick={(e) => e.stopPropagation()}
								>
									<div className="hidden lg:block w-full opacity-75 bg-[linear-gradient(-45deg,var(--color-border)_12.50%,transparent_12.50%,transparent_50%,var(--color-border)_50%,var(--color-border)_62.50%,transparent_62.50%,transparent_100%)] bg-size-[5px_5px]" />

									<div
										className={cn(
											'relative w-full origin-center grid border-x',
											'outline-none',
											containerClassName
										)}
										onClick={(e) => e.stopPropagation()}
									>
										<button
											className="absolute top-4 right-4 p-2 rounded-xl transition-colors hover:bg-foreground hover:text-background"
											type="button"
											aria-label="Close modal"
											onClick={() => setIsOpen(false)}
										>
											&times;
										</button>
										<ModalContent className={cn('flex flex-col items-center gap-2', className)}>
											{children}
										</ModalContent>
									</div>

									<div className="hidden lg:block w-full opacity-75 bg-[linear-gradient(-45deg,var(--color-border)_12.50%,transparent_12.50%,transparent_50%,var(--color-border)_50%,var(--color-border)_62.50%,transparent_62.50%,transparent_100%)] bg-size-[5px_5px]" />
								</motion.div>
							</motion.div>
						)}
					</AnimatePresence>,
					document.body
				)}
		</>
	);
};

interface ModalTriggerProps {
	children: React.ReactNode;
	onOpen: () => void;
	className?: string;
}

const ModalTrigger = ({ onOpen, children, className }: ModalTriggerProps) => {
	return (
		<button onClick={onOpen} className={cn(className)}>
			{children}
		</button>
	);
};

interface ModalContentProps {
	children: React.ReactNode;
	className?: string;
}

const ModalContent = ({ children, className }: ModalContentProps) => {
	return <div className={cn(className)}>{children}</div>;
};

export default Modal;
export { ModalContent, ModalTrigger };
