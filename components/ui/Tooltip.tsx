'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useCallback, useRef, useId } from 'react';

interface TooltipProps {
	message: string;
	placement?: 'top' | 'bottom' | 'left' | 'right';
	children: React.ReactNode;
	className?: string;
	disabled?: boolean;
	delay?: number;
}

export const Tooltip = ({
	message,
	children,
	placement = 'bottom',
	className,
	disabled = false,
	delay = 500,
}: TooltipProps) => {
	const [isVisible, setIsVisible] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const tooltipId = useId();

	const showTooltip = useCallback(() => {
		if (disabled) return;

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			setIsVisible(true);
		}, delay);
	}, [disabled, delay]);

	const hideTooltip = useCallback(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		setIsVisible(false);
	}, []);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent) => {
			if (event.key === 'Escape') {
				hideTooltip();
			}
		},
		[hideTooltip]
	);

	const cleanupTimeout = useCallback(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
	}, []);

	// Position-based styles
	const getPositionStyles = () => {
		const baseStyles = 'absolute z-20 pointer-events-none';
		const positions = {
			top: '-top-2 left-1/2 -translate-x-1/2 -translate-y-full',
			bottom: '-bottom-2 left-1/2 -translate-x-1/2 translate-y-full',
			left: 'top-1/2 -left-2 -translate-y-1/2 -translate-x-full',
			right: 'top-1/2 -right-2 -translate-y-1/2 translate-x-full',
		};
		return `${baseStyles} ${positions[placement]}`;
	};

	const Arrow = () => {
		const arrowStyles = {
			top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-border',
			bottom:
				'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-border',
			left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-border',
			right:
				'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-border',
		};

		return (
			<div className={cn('absolute size-0 border-6', arrowStyles[placement])} aria-hidden="true" />
		);
	};

	// Animation variants
	const variants = {
		hidden: {
			opacity: 0,
			scale: 0.95,
			y: placement === 'top' ? 5 : placement === 'bottom' ? -5 : 0,
			x: placement === 'left' ? 5 : placement === 'right' ? -5 : 0,
		},
		visible: {
			opacity: 1,
			scale: 1,
			y: 0,
			x: 0,
			transition: {
				duration: 0.15,
				ease: 'easeOut',
			},
		},
		exit: {
			opacity: 0,
			scale: 0.95,
			y: placement === 'top' ? 5 : placement === 'bottom' ? -5 : 0,
			x: placement === 'left' ? 5 : placement === 'right' ? -5 : 0,
			transition: {
				duration: 0.1,
				ease: 'easeOut',
			},
		},
	};

	return (
		<div
			className={cn('relative inline-flex', className)}
			onMouseLeave={hideTooltip}
			onBlur={hideTooltip}
		>
			<div
				className="inline-flex"
				onMouseEnter={showTooltip}
				onKeyDown={handleKeyDown}
				aria-describedby={isVisible ? tooltipId : undefined}
			>
				{children}
			</div>

			<AnimatePresence onExitComplete={cleanupTimeout}>
				{isVisible && !disabled && (
					<motion.div
						id={tooltipId}
						role="tooltip"
						aria-live="polite"
						variants={variants}
						initial="hidden"
						animate="visible"
						exit="exit"
						className={getPositionStyles()}
					>
						<div className="relative flex flex-col items-center">
							<div className="relative px-3 py-1.5 text-xs text-foreground bg-background-secondary border rounded-lg shadow-xs whitespace-nowrap max-w-xs">
								{message}
								<Arrow />
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
