import { IconDoodleCoffee, IconDoodleGuitar, IconDoodlePhoto, IconDoodleTech } from '@/data/icons';
import { navItems } from '@/data/navigation';
import avatar from '@/public/images/pixel.png';

import Image from 'next/image';
import CustomLink from '../blog/Link';

export default function Hero() {
	return (
		<>
			<div className="group relative mx-auto rounded-full ring-1 ring-offset-6 ring-offset-background ring-border shadow-inner hover:ring-offset-8 transition-all">
				<Image
					src={avatar}
					alt="Profile Picture"
					width={128}
					height={128}
					priority
					placeholder="blur"
					draggable={false}
					className="rounded-full ring-2 ring-border ring-offset-4 ring-offset-background shadow-lg transition-all group-hover:ring-brand/80 group-hover:scale-105"
				/>

				<span className="absolute top-2 left-0 w-full text-xs px-2 py-1 rounded-lg border bg-background-secondary/50 backdrop-blur-sm opacity-0 transition-all ease-out group-hover:opacity-100 group-hover:-translate-y-3">
					Things on my mind
				</span>
				<div className="absolute inset-0 flex items-center justify-center motion-safe:will-change-transform motion-safe:animate-rotate text-foreground-tertiary/50">
					<span className="motion-safe:animate-rotate-reverse absolute top-0 right-0 text-4xl opacity-0 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-5 group-hover:-translate-y-5">
						<IconDoodlePhoto className="w-9 h-9" />
					</span>
					<span className="motion-safe:animate-rotate-reverse absolute bottom-0 right-0 text-4xl opacity-0  transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-5 group-hover:translate-y-5">
						<IconDoodleTech className="w-9 h-9" />
					</span>
					<span className="motion-safe:animate-rotate-reverse absolute top-0 left-0 text-4xl opacity-0  transition-all duration-300 ease-out group-hover:opacity-100 group-hover:-translate-x-5 group-hover:-translate-y-5">
						<IconDoodleGuitar className="w-9 h-9" />
					</span>
					<span className="motion-safe:animate-rotate-reverse absolute bottom-0 left-0 text-4xl opacity-0 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:-translate-x-5 group-hover:translate-y-5">
						<IconDoodleCoffee className="w-9 h-9" />
					</span>
				</div>
			</div>
			<div className="max-w-2xl mx-auto text-balance px-4 space-y-2">
				<h1 className="text-xl">Hey, I&apos;m Simon</h1>
				<p className="text-foreground-secondary">
					I&apos;m a software engineer specializing in building exceptional digital experiences.
					Currently, I&apos;m focused on building accessible, human-centered products
				</p>
			</div>
		</>
	);
}
