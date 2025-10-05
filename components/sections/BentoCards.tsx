import { Post } from '@/.content-collections/generated';
import CardOverlay from '@/components/ui/CardOverlay';
import { IconHourglass, IconNextjs, IconReact, IconTailwind } from '@/data/icons';
import { getStaticImages } from '@/lib/gallery';
import { cn } from '@/lib/utils';
import HeroImage from '@/public/images/hero.jpg';
import Image from 'next/image';
import { BentoCard } from '../ui/Bento';

function BentoCardAbout() {
	return (
		<BentoCard
			href="/about"
			colSpan={5}
			rowSpan={6}
			containerClassName="min-h-[250px] md:min-h-auto order-0"
		>
			<div className="text-balance w-full lg:w-auto lg:max-w-1/2 h-full flex flex-col justify-center">
				<h3 className="mb-2 transition-colors group-hover:text-brand">Learn more about me</h3>
				<p className="text-foreground-secondary text-base">
					Hey, I&apos;m Simon.
					<br /> A front-end engineer and photographer.
				</p>
			</div>

			<div className="relative w-full">
				<Image
					src={HeroImage}
					alt="portrait of Simon Nyström"
					priority
					placeholder="blur"
					draggable={false}
					className={cn(
						'absolute top-4 -right-6 lg:right-2 w-48 aspect-4/5 object-cover rounded-xl shadow-sm rotate-6 grayscale',
						'transition-all duration-300 ease-out group-hover:-translate-y-3 group-hover:rotate-3 group-hover:scale-105 group-hover:shadow-xl group-hover:grayscale-0',
						'ring-1 ring-border ring-offset-4 ring-offset-background group-hover:ring-offset-8 group-hover:ring-brand/80'
					)}
				/>
			</div>
			<CardOverlay withIcon />
		</BentoCard>
	);
}

async function BentoCardGallery() {
	const images = await getStaticImages(4);

	return (
		<BentoCard
			href="/gallery"
			colSpan={7}
			rowSpan={8}
			containerClassName="order-2 md:order-0 border-r-0 min-h-[300px] md:min-h-auto"
			className="flex-col sm:flex-row items-center text-center sm:text-left gap-2"
		>
			<div className="text-balance sm:h-full w-full sm:max-w-1/2 flex flex-col justify-center mb-4 sm:mb-0">
				<h3 className="transition-colors group-hover:text-brand">Photo gallery</h3>
				<p className="text-base text-foreground-secondary">
					Moments, places, and details I&apos;ve noticed along the way.
				</p>
			</div>

			<div className="mb-auto sm:absolute z-10 -right-12 lg:-right-6 w-full flex justify-center sm:justify-end -order-1 sm:order-0">
				<div
					className={cn(
						'-mx-14 sm:mx-0 flex sm:grid grid-cols-2 gap-2 w-fit',
						'transition-all duration-300 ease-out',
						'sm:ring-1 ring-border ring-offset-8 ring-offset-background-secondary group-hover:ring-offset-12 group-hover:ring-brand/80'
					)}
				>
					{images.map((img, i) => (
						<Image
							key={i}
							src={img.src}
							alt={img.alt}
							width={168}
							height={210}
							priority={true}
							placeholder="blur"
							blurDataURL={img.blurData}
							draggable={false}
							className={cn(
								'w-36 sm:w-42 md:w-32 lg:w-42 rounded-lg aspect-4/5 object-cover shadow-md grayscale',
								'transition-all duration-300 ease-out group-hover:opacity-100 group-hover:hover:scale-105 group-hover:grayscale-0',
								i % 2 === 0
									? '-translate-y-8 sm:-translate-y-5'
									: '-translate-y-5 sm:translate-y-5',
								i % 2 === 0
									? 'group-hover:-translate-y-2 sm:group-hover:translate-y-5'
									: 'group-hover:-translate-y-2 sm:group-hover:-translate-y-5'
							)}
						/>
					))}
				</div>
			</div>

			<CardOverlay withIcon />
		</BentoCard>
	);
}

function BentoCardProjects() {
	return (
		<BentoCard
			href="/projects"
			colSpan={5}
			rowSpan={7}
			containerClassName="order-3 md:order-0 min-h-[230px] md:min-h-auto border-b-0"
			className="flex-col items-center px-4 pt-6 pb-4"
		>
			<div className="text-balance text-center">
				<h3 className="transition-colors group-hover:text-brand">Projects</h3>
				<p className="text-foreground-secondary text-base max-w-md">
					Some of the things I&apos;ve built, tinkered with, or just enjoyed working on.
				</p>
			</div>

			<div className="relative flex items-center gap-2 mt-auto text-foreground-tertiary dark:text-foreground-tertiary/80 transition-colors dark:group-hover:text-foreground-tertiary">
				{[
					{ Icon: IconNextjs, size: 'w-8 h-8 lg:w-10 lg:h-10' },
					{ Icon: IconReact, size: 'w-8 h-8 lg:w-12 lg:h-12' },
					{ Icon: IconTailwind, size: 'w-8 h-8 lg:w-10 lg:h-10' },
				].map(({ Icon, size }, idx) => (
					<div
						key={idx}
						className={cn(
							'relative p-1.5 bg-foreground-tertiary/10 dark:bg-background-secondary border rounded-2xl shadow-inner',
							idx !== 1 && 'scale-90',
							'transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:border-brand/20'
						)}
					>
						<div className="p-4 md:p-6 bg-background-secondary dark:bg-foreground-tertiary/5 border rounded-xl shadow-lg transition-shadow group-hover:shadow-brand/40 dark:group-hover:shadow-brand/10">
							<Icon className={size} />
						</div>
						<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/80 from-20% via-white/10 to-30% to-background opacity-20 pointer-events-none" />
					</div>
				))}
			</div>

			<CardOverlay withIcon />
		</BentoCard>
	);
}

function BentoCardBlog({ latestPost }: { latestPost: Post }) {
	return (
		<BentoCard
			href={`/blog/${latestPost.slug}`}
			colSpan={7}
			rowSpan={5}
			className="items-center"
			containerClassName="order-1 md:order-0 gap-x-2 min-h-[210px] md:max-h-auto"
		>
			<div className="text-balance h-full flex-1 max-w-xs flex flex-col justify-center text-sm font-medium">
				<span className="mb-1 text-foreground-secondary transition-colors group-hover:text-brand">
					Latest post
				</span>
				<p className="text-base">{latestPost?.title}</p>
				<div className="mt-5 flex items-center gap-x-2 text-foreground-secondary">
					<IconHourglass width={14} height={14} />
					<span>{latestPost?.readingTime}</span>
				</div>
			</div>
			<div className="relative flex-1 h-full">
				<div
					className={cn(
						'absolute -right-20 -bottom-6 md:-bottom-14 translate-x-10 md:translate-x-0 p-2 rounded-xl flex flex-wrap gap-2',
						'transition-all duration-300 ease-out group-hover:-translate-y-8 md:group-hover:-translate-y-12 group-hover:translate-x-6 md:group-hover:-translate-x-6 lg:group-hover:-translate-x-12',
						'ring-1 ring-border ring-offset-4 ring-offset-background-secondary group-hover:ring-brand/80'
					)}
				>
					{Array.from({ length: 3 }).map((_, i) => {
						const tag = latestPost?.tags[i % (latestPost?.tags.length || 1)];
						return (
							<div
								key={i}
								className={cn(
									'relative text-lg sm:text-xl w-full font-medium whitespace-nowrap px-4 py-2 bg-foreground-secondary/5 text-foreground-tertiary/60 rounded-xl transition-colors group-hover:text-foreground-tertiary'
								)}
							>
								<span className="transition-colors duration-300 ease-out group-hover:text-brand/80">
									#
								</span>
								{tag}
								<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/60 from-10% via-white/10 to-30% to-background opacity-0 pointer-events-none transition-opacity duration-300 ease-out group-hover:opacity-10" />
							</div>
						);
					})}
				</div>
			</div>

			<CardOverlay withIcon />
		</BentoCard>
	);
}

export { BentoCardAbout, BentoCardBlog, BentoCardGallery, BentoCardProjects };
