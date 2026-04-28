import { cn } from '@/lib/utils';
import lqip from 'lqip-modern';
import Image from 'next/image';
import React from 'react';

type CustomImageProps = {
	src: string;
	alt: string;
	caption?: React.ReactNode | string;
	priority?: boolean;
};

const BLOG_IMAGE_DIR = `/assets/writing`;

export default async function CustomImage({
	src,
	alt,
	caption,
	priority = false,
}: CustomImageProps) {
	const result = await lqip(`public${BLOG_IMAGE_DIR}/${src}`);

	return (
		<figure>
			<Image
				src={`${BLOG_IMAGE_DIR}/${src}`}
				width={result.metadata.originalWidth}
				height={result.metadata.originalHeight}
				alt={alt}
				className="w-full h-auto rounded-xl border shadow-xs"
				priority={priority}
				placeholder="blur"
				blurDataURL={result.metadata.dataURIBase64}
				draggable={false}
			/>
			{caption && (
				<figcaption className={cn('text-xs text-center text-foreground-tertiary')}>
					{caption}
				</figcaption>
			)}
		</figure>
	);
}
