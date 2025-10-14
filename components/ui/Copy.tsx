'use client';

import { cn } from '@/lib/utils';
import React, { useState } from 'react';

type Variant = 'slide' | 'grow';

interface CopyProps {
	icon?: React.ReactNode;
	toCopy: string;
	successMessage: string | React.ReactNode;
	variant?: Variant;
	className?: string;
	hiddenClassName?: string;
	children: React.ReactNode;
}

export default function Copy({
	icon,
	toCopy,
	successMessage,
	variant = 'slide',
	className,
	hiddenClassName,
	children,
}: CopyProps) {
	const [copied, setCopied] = useState(false);

	const variants = {
		slide: {
			mainElement: copied ? '-translate-y-5' : '',
			hiddenElement: cn('translate-y-5', copied && 'translate-y-0'),
		},
		grow: {
			mainElement: copied ? 'scale-0' : '',
			hiddenElement: copied ? 'scale-100' : 'scale-0',
		},
	};

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(toCopy);
			setCopied(true);
			setTimeout(() => setCopied(false), 3000); // Reset state after 3 seconds
		} catch (error) {
			console.error('Failed to copy: ', error);
		}
	};

	return (
		<button
			onClick={handleCopy}
			className={cn(
				'relative overflow-hidden flex items-center gap-x-2 text-foreground-secondary text-sm hover:text-foreground transition-colors duration-200 ease-out hover:cursor-pointer',
				className
			)}
		>
			{icon}
			<span
				className={cn('transition-transform duration-200 ease-out', variants[variant].mainElement)}
			>
				{children}
			</span>
			<span
				className={cn(
					'absolute bottom-0 transition-transform duration-200 ease-out',
					icon ? 'left-6' : 'left-0',
					variants[variant].hiddenElement,
					hiddenClassName
				)}
			>
				{successMessage}
			</span>
		</button>
	);
}
