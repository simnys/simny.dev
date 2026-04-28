'use client';

import { ThemeProvider } from '@teispace/next-themes';

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			themeColor={{ light: '#fcfcfc', dark: '#0f0f0f' }}
			attribute="class"
			disableTransitionOnChange
		>
			{children}
		</ThemeProvider>
	);
}
