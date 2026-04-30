'use client';

import { GalleryCollectionType, StaticImage } from '@/lib/types/types';
import { slugify } from '@/lib/utils';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import { Icon } from './Icon';

type Props = {
	item: GalleryCollectionType;
	priority: boolean;
};

export default function GalleryCard({ item, priority }: Props) {
	const cover = item.cover as StaticImage;

	return (
		<Link
			href={`/photography/${slugify(item.title)}`}
			className="relative group rounded-lg overflow-hidden block aspect-video sm:aspect-square lg:aspect-4/5 w-full"
		>
			<CldImage
				src={cover.src}
				width={360}
				height={360}
				alt={cover.alt}
				priority={priority}
				fetchPriority={priority ? 'high' : 'auto'}
				loading={priority ? 'eager' : 'lazy'}
				placeholder="blur"
				blurDataURL={cover.blurData}
				className="w-full h-full object-cover group-focus-visible:p-0.5 rounded-lg"
			/>
			<div className="bg-linear-to-t from-foreground/80 dark:from-background/80 via-transparent to-transparent flex flex-col items-start justify-end p-4 absolute w-full top-0 bottom-0 text-background dark:text-foreground transition-colors duration-200 ease-out group-hover:bg-background/20">
				<div className="text-sm flex items-center gap-1.5 opacity-80">
					<Icon name="gallery" className="size-4" />
					{item.length}
				</div>
				<h3>{item.title}</h3>
			</div>
		</Link>
	);
}
