'use client';

import { GalleryImage } from '@/lib/types';
import { cn, slugify } from '@/lib/utils';

import { IconGallery } from '@/data/icons';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import CardOverlay from './CardOverlay';

type Props = {
	isCollection: boolean;
	item: GalleryImage;
	collectionTitle: string;
	collectionSize: number;
	priority: boolean;
	lightboxIndex: number;
	handleImageClick: (e: any, lightboxIndex: number) => void;
};

export default function GalleryItem({
	isCollection,
	item,
	collectionTitle,
	collectionSize,
	priority,
	lightboxIndex,
	handleImageClick,
}: Props) {
	if (!item) return;

	return (
		<>
			{isCollection ? (
				<Link
					href={`/gallery/${slugify(collectionTitle)}`}
					className="relative group overflow-hidden"
				>
					<CldImage
						src={item.src}
						width={item.width}
						height={item.height}
						alt={item.alt ?? ''}
						priority={priority}
						loading={priority ? 'eager' : 'lazy'}
						placeholder="blur"
						blurDataURL={item.blurData}
						className="aspect-square w-full object-cover object-center rounded-xl"
					/>
					<div className="rounded-xl bg-linear-to-t from-foreground/80 dark:from-background/80 via-transparent to-transparent flex flex-col items-start justify-end p-4 absolute w-full top-0 bottom-0 text-background dark:text-foreground transition-colors duration-300 ease-out group-hover:bg-background/20">
						<div className="text-xs flex items-center gap-1 opacity-80">
							<IconGallery />
							{collectionSize}
						</div>
						<h3 className="text-xl">{collectionTitle}</h3>
					</div>

					<CardOverlay withIcon withOverlay={false} />
				</Link>
			) : (
				<div
					className={cn('relative hover:cursor-zoom-in')}
					onClick={(e) => handleImageClick(e, lightboxIndex)}
				>
					<CldImage
						src={item.src}
						width={item.width}
						height={item.height}
						alt={item.alt ?? ''}
						priority={priority}
						loading={priority ? 'eager' : 'lazy'}
						placeholder="blur"
						blurDataURL={item.blurData}
						className="w-full h-full object-cover object-center"
					/>
				</div>
			)}
		</>
	);
}
