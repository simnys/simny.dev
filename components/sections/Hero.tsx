import avatar from '@/public/images/pixel.png';
import Image from 'next/image';
import CustomLink from '../blog/Link';

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
						priority
						fetchPriority="high"
					/>
				</div>

				<div>
					<span className="block font-medium">Simon Nyström</span>
					<span className="block text-sm sm:text-base text-foreground-tertiary">Web Engineer</span>
				</div>
			</div>
			<p className="prose">
				I&apos;m a Web engineer at{' '}
				<CustomLink href="https://soprasteria.com" icon="logoSopra">
					Sopra Steria
				</CustomLink>
				, crafting interfaces and web experiences that feel intentional in both form and behavior. I
				care about the details, from how it looks and responds to how it is{' '}
				<em>designed and architected</em>.
			</p>
			<p className="prose">
				I share occasional <CustomLink href="/now">updates</CustomLink> on random things and
				endeavors. You can reach me on{' '}
				<CustomLink href="https://linkedin.com/in/simon-nystrom" icon="linkedin">
					LinkedIn
				</CustomLink>
				, and via{' '}
				<CustomLink href="mailto:simons.nystrom@gmail.com" icon="email">
					email
				</CustomLink>{' '}
				or browse code on{' '}
				<CustomLink href="https://github.com/simnys" icon="github">
					GitHub
				</CustomLink>
				.
			</p>
		</>
	);
}
