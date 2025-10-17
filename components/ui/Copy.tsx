'use client';

import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { Button } from './Button';

interface CopyProps {
	toCopy: string;
	successMessage: React.ReactNode;
	className?: string;
	children: React.ReactNode;
}

export default function Copy({ toCopy, successMessage, className, children }: CopyProps) {
	const [copied, setCopied] = useState(false);

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
		<Button
			variant="ghost"
			onClick={handleCopy}
			className={cn('relative overflow-hidden', className)}
		>
			<span
				className={cn(
					'absolute transition-transform duration-200 ease-out',
					copied ? 'scale-0' : 'scale-100'
				)}
			>
				{children}
			</span>
			<span
				className={cn(
					'absolute transition-transform duration-200 ease-out',
					copied ? 'scale-100' : 'scale-0'
				)}
			>
				{successMessage}
			</span>
		</Button>
	);
}
