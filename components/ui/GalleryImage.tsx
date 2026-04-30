'use client';

import { GalleryImageType } from '@/lib/types/types';
import { cn } from '@/lib/utils';
import { CldImage } from 'next-cloudinary';

type Props = {
	item: GalleryImageType;
	priority: boolean;
	lightboxIndex: number;
	onClick: (index: number) => void;
};

export default function GalleryImage({ item, priority, lightboxIndex, onClick }: Props) {
	return (
		<button
			type="button"
			className={cn(
				'relative block w-full hover:cursor-zoom-in rounded-sm overflow-hidden bg-background-tertiary',
				'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
			)}
			onClick={() => onClick(lightboxIndex)}
			aria-label={`Open image ${lightboxIndex + 1} in lightbox`}
		>
			<CldImage
				src={item.src}
				width={Math.floor(item.width / 4)}
				height={Math.floor(item.height / 4)}
				alt={item.alt ?? ''}
				priority={priority}
				fetchPriority={priority ? 'high' : 'auto'}
				loading={priority ? 'eager' : 'lazy'}
				placeholder="blur"
				blurDataURL={item.blurData}
				className="w-full h-full object-cover object-center"
			/>
		</button>
	);
}
