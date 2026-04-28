import { GalleryCollection, GalleryImage, StaticImage } from '@/lib/types/types';
import { cn, slugify } from '@/lib/utils';

import Link from 'next/link';
import { Icon } from './Icon';
import { CldImage } from 'next-cloudinary';
import Image from 'next/image';

type CollectionItemProps = {
	variant: 'collection';
	item: GalleryCollection;
	priority: boolean;
};

type ImageItemProps = {
	variant: 'image';
	item: GalleryImage;
	priority: boolean;
	lightboxIndex: number;
	handleImageClick: (lightboxIndex: number) => void;
};

type Props = CollectionItemProps | ImageItemProps;

export default function GalleryItem(props: Props) {
	if (!props.item) return;

	return (
		<>
			{props.variant === 'collection' ? (
				<Link
					href={`/photography/${slugify(props.item.title)}`}
					className="relative group rounded-lg overflow-hidden block aspect-video sm:aspect-square lg:aspect-4/5 w-full"
				>
					<Image
						src={(props.item.cover as StaticImage).src}
						width={360}
						height={360}
						alt={(props.item.cover as StaticImage).alt}
						priority={props.priority}
						fetchPriority={props.priority ? 'high' : 'auto'}
						loading={props.priority ? 'eager' : 'lazy'}
						placeholder="blur"
						blurDataURL={(props.item.cover as StaticImage).blurData}
						className="w-full h-full object-cover group-focus-visible:p-0.5 rounded-lg"
					/>
					<div className="bg-linear-to-t from-foreground/80 dark:from-background/80 via-transparent to-transparent flex flex-col items-start justify-end p-4 absolute w-full top-0 bottom-0 text-background dark:text-foreground transition-colors duration-200 ease-out group-hover:bg-background/20">
						<div className="text-sm flex items-center gap-1.5 opacity-80">
							<Icon name="gallery" className="size-4" />
							{props.item.length}
						</div>
						<h3>{props.item.title}</h3>
					</div>
				</Link>
			) : (
				<button
					type="button"
					className={cn(
						'relative block w-full hover:cursor-zoom-in rounded-sm overflow-hidden',
						'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
					)}
					onClick={() => props.handleImageClick(props.lightboxIndex)}
					aria-label={`Open image ${props.lightboxIndex + 1} in lightbox`}
				>
					<CldImage
						src={props.item.src}
						width={Math.floor(props.item.width / 4)}
						height={Math.floor(props.item.height / 4)}
						alt={props.item.alt ?? ''}
						priority={props.priority}
						fetchPriority={props.priority ? 'high' : 'auto'}
						loading={props.priority ? 'eager' : 'lazy'}
						placeholder="blur"
						blurDataURL={props.item.blurData}
						className="w-full h-full object-cover object-center"
					/>
				</button>
			)}
		</>
	);
}
