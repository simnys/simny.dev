'use client';

import { cn } from '@/lib/utils';
import { useTheme } from '@teispace/next-themes';
import { Icon } from './Icon';
import { Button } from './Button';

export default function ThemeSwitcher({ className }: { className?: string }) {
	const { setTheme, resolvedTheme } = useTheme();

	return (
		<Button
			variant="ghost"
			size="icon"
			aria-label="Change Theme"
			onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
			className={cn('relative cursor-pointer', className)}
		>
			<Icon name="sun" className="absolute hidden dark:block" />
			<Icon name="moon" className="absolute dark:hidden" />
		</Button>
	);
}
