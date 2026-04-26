import avatar from '@/public/images/pixel.png';
import Image from 'next/image';

export default function Hero() {
	return (
		<>
			<div className="flex items-center gap-4">
				<div className="relative shrink-0">
					<Image
						width={64}
						height={64}
						src={avatar}
						alt=""
						draggable={false}
						className="size-13 rounded-full not-prose"
					/>
					<div className="absolute right-0 -bottom-1 size-4 p-1 bg-background rounded-full flex items-center justify-center">
						<div className="size-full rounded-full bg-brand" />
					</div>
				</div>

				<div>
					<span className="block font-medium">Simon Nyström</span>
					<span className="block text-sm sm:text-base text-foreground-tertiary">
						Software Developer at Sopra Steria
					</span>
				</div>
			</div>
			<p className="prose">
				Hey, I'm Simon Nyström, a <em>front-end engineer</em> and photographer from Sweden. I got
				into coding out of curiosity and a love for making things work online, and it's been a wild
				ride ever since.
			</p>
		</>
	);
}
