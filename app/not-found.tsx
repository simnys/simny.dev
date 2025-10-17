import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Page not found',
};

export default function NotFound() {
	return (
		<main className="grow h-full flex flex-col gap-1 items-center justify-center">
			<Icon name="warning" className="size-8 text-brand" />
			<h1 className="text-xl mt-6 mb-2">It seems like you are lost</h1>
			<p className="text-foreground-secondary mb-4 text-center">
				You have strayed too far from the path. But don&apos;t worry,
				<br className="hidden sm:block" />
				I&apos;ll get you right back on track!
			</p>
			<Button asChild icon={<Icon name="home" className="size-4 mr-1" />} iconPosition="left">
				<Link href="/">Take me home</Link>
			</Button>
		</main>
	);
}
