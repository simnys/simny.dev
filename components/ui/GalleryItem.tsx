import { GalleryImage, StaticImage } from '@/lib/types/types';
import { cn, slugify } from '@/lib/utils';

import Link from 'next/link';
import { Icon } from './Icon';
import { CldImage } from 'next-cloudinary';
import Image from 'next/image';

type Props = {
	isCollection: boolean;
	item: GalleryImage | StaticImage;
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
					href={`/photography/${slugify(collectionTitle)}`}
					className="relative group rounded-lg overflow-hidden block aspect-square sm:aspect-[4/5] w-full"
				>
					<Image
						src={item.src}
						width={360}
						height={360}
						alt={item.alt ?? ''}
						priority={priority}
						fetchPriority={priority ? 'high' : 'auto'}
						loading={priority ? 'eager' : 'lazy'}
						placeholder="blur"
						blurDataURL={item.blurData}
						className="w-full h-full object-cover group-focus-visible:p-0.5 rounded-lg"
					/>
					<div className="bg-linear-to-t from-foreground/80 dark:from-background/80 via-transparent to-transparent flex flex-col items-start justify-end p-4 absolute w-full top-0 bottom-0 text-background dark:text-foreground transition-colors duration-200 ease-out group-hover:bg-background/20">
						<div className="text-sm flex items-center gap-1.5 opacity-80">
							<Icon name="gallery" className="size-4" />
							{collectionSize}
						</div>
						<h3 className="">{collectionTitle}</h3>
					</div>
				</Link>
			) : (
				<div
					className={cn('relative hover:cursor-zoom-in rounded-sm overflow-hidden')}
					onClick={(e) => handleImageClick(e, lightboxIndex)}
				>
					<CldImage
						src={item.src}
						width={Math.floor((item as GalleryImage).width / 4)}
						height={Math.floor((item as GalleryImage).height / 4)}
						alt={item.alt ?? ''}
						priority={priority}
						fetchPriority={priority ? 'high' : 'auto'}
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
