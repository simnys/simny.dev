'use client';

import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { Icon } from './Icon';

export default function ThemeSwitcher({ className }: { className?: string }) {
	const { setTheme } = useTheme();

	return (
		<>
			<button
				onClick={() => setTheme('light')}
				className={cn('cursor-pointer hidden dark:block', className)}
				aria-label="Change to light mode"
			>
				<Icon name="sun" />
			</button>
			<button
				onClick={() => setTheme('dark')}
				className={cn('cursor-pointer dark:hidden', className)}
				aria-label="Change to dark mode"
			>
				<Icon name="moon" />
			</button>
		</>
	);
}
