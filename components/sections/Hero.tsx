import avatar from '@/public/images/avatar-px.png';
import Image from 'next/image';

export default function Hero() {
	return (
		<>
			<div className="relative mx-auto rounded-full ring-1 ring-offset-6 ring-offset-background ring-border shadow-inner">
				<Image
					src={avatar}
					alt="Profile Picture"
					width={128}
					height={128}
					priority
					placeholder="blur"
					draggable={false}
					className="rounded-full ring-2 ring-border ring-offset-4 ring-offset-background shadow-lg"
				/>
			</div>

			<div className="max-w-2xl mx-auto text-balance px-4 space-y-2">
				<h1 className="">Hey, I&apos;m Simon.</h1>
				<p className="text-foreground-secondary">
					I&apos;m a software engineer specializing in building exceptional digital experiences.
					Currently, I&apos;m focused on building accessible, human-centered products
				</p>
			</div>
		</>
	);
}
