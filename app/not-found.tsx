import { Icon } from '@/components/ui/Icon';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Page not found',
};

export default function NotFound() {
	return (
		<main className="grow h-full flex flex-col gap-1 items-center justify-center">
			<Icon name="warning" />
			<h1 className="text-xl mt-6 mb-2">It seems like you are lost</h1>
			<p className="text-foreground-secondary mb-4 text-center">
				You have strayed too far from the path. But don&apos;t worry,
				<br className="hidden sm:block" />
				I&apos;ll get you right back on track!
			</p>
			<Link
				href="/"
				className="before:content-none text-sm font-medium flex items-center gap-2 py-2 px-4 rounded-full bg-foreground-secondary/5 text-foreground-secondary ring-1 ring-transparent ring-offset-background transition-all hover:bg-foreground-secondary/10 hover:text-foreground hover:ring-brand hover:ring-offset-2"
			>
				Take me home
			</Link>
		</main>
	);
}
