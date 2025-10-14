import { Icon } from '../ui/Icon';

export default function Footer() {
	return (
		<footer className="h-fit mt-auto p-2 sm:py-4 sm:px-6 text-foreground-tertiary">
			<div className="max-w-3xl w-full mx-auto py-4 px-6 flex flex-col gap-y-2 sm:flex-row sm:items-center justify justify-between bg-background-secondary rounded-xl">
				<span className="flex items-center gap-2 text-sm">
					<Icon name="heart" className="size-4" />
					Thank you for visiting!
				</span>

				<span className="text-xs">
					© {new Date().getFullYear()} Simon Nyström. All rights reserved.
				</span>
			</div>
		</footer>
	);
}
