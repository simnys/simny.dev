'use client';

import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { Icon } from './Icon';

export default function ThemeSwitcher({ className }: { className?: string }) {
	const { setTheme, resolvedTheme } = useTheme();

	return (
		<button
			aria-label={`Change to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
			onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
			className={cn('cursor-pointer', className)}
		>
			<Icon name="sun" className="absolute hidden dark:block" />
			<Icon name="moon" className="absolute dark:hidden" />
		</button>
	);
}
