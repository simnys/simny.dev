'use client';

import { ThemeProvider } from '@teispace/next-themes';

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			enableColorScheme
			disableTransitionOnChange
		>
			{children}
		</ThemeProvider>
	);
}
