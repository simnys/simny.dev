'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface TooltipProps {
	message: string;
	origin?: 'bottom' | 'top';
	children: React.ReactNode;
	className?: string;
}

export const Tooltip = ({ message, children, origin = 'bottom', className }: TooltipProps) => {
	const [show, setShow] = useState(false);

	const variants = {
		initial: {
			opacity: 0,
			y: origin === 'bottom' ? -5 : 5,
			transformOrigin: origin === 'bottom' ? 'top' : 'bottom',
		},
		animate: {
			opacity: 1,
			scale: 1,
			y: 0,
			transformOrigin: origin === 'bottom' ? 'top' : 'bottom',
			transition: {
				duration: 0.15,
				delay: 0.5,
				ease: 'easeOut',
			},
		},
		exit: {
			opacity: 0,
			y: origin === 'bottom' ? -5 : 5,
			transformOrigin: origin === 'bottom' ? 'top' : 'bottom',
			transition: {
				duration: 0.15,
				ease: 'easeOut',
			},
		},
	};

	return (
		<div className={cn('relative flex flex-col items-center group', className)}>
			<span
				className="flex justify-center"
				onMouseEnter={() => setShow(true)}
				onClick={() => setShow(false)}
				onMouseLeave={() => setShow(false)}
				onBlur={() => setShow(false)}
			>
				{children}
			</span>

			<AnimatePresence>
				{show && (
					<motion.div
						role="tooltip"
						aria-hidden={show}
						variants={variants}
						initial="initial"
						animate="animate"
						exit="exit"
						className={cn(
							`z-20 pointer-events-none absolute whitespace-nowrap ${
								origin === 'bottom' ? '-bottom-10' : '-top-10'
							} flex flex-col items-center`,
							!show ? 'hidden' : null
						)}
					>
						{origin === 'bottom' && (
							<div className="-mt-2 translate-y-1.5 w-3 h-3 rotate-45 bg-background-secondary border-t border-l z-20" />
						)}
						<span className="relative z-10 px-3 py-2 text-xs leading-none text-foreground whitespace-no-wrap bg-background-secondary shadow-sm border rounded-lg">
							{message}
						</span>
						{origin === 'top' && (
							<div className="-mt-1.5 w-3 h-3 rotate-45 bg-background-secondary border-b border-r z-20" />
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
