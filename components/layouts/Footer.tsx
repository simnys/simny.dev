import { IconHeart, Logo } from '@/data/icons';

export default function Footer() {
	return (
		<footer className="max-w-3xl mx-auto w-full h-fit mt-auto p-4 md:px-6 flex items-center justify justify-between text-foreground-tertiary">
			<span className="flex items-center gap-2 text-sm">
				<IconHeart className="size-4" />
				Thank you for visiting!
			</span>

			<span className="text-xs">
				© {new Date().getFullYear()} Simon Nyström. All rights reserved.
			</span>
		</footer>
	);
}
