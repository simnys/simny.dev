import { cn } from '@/lib/utils';
import { getPlaiceholder } from 'plaiceholder';
import { readFile } from 'fs/promises';
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
	if (!src) return;

	const buffer = await readFile(`public${BLOG_IMAGE_DIR}/${src}`);
	const { base64, metadata } = await getPlaiceholder(buffer);

	return (
		<figure>
			<Image
				src={`${BLOG_IMAGE_DIR}/${src}`}
				width={metadata.width}
				height={metadata.height}
				alt={alt}
				priority={priority}
				fetchPriority={priority ? 'high' : 'auto'}
				placeholder="blur"
				blurDataURL={base64}
				draggable={false}
				className="w-full h-auto rounded-xl border shadow-xs"
			/>
			{caption && (
				<figcaption className={cn('text-xs text-center text-foreground-tertiary')}>
					{caption}
				</figcaption>
			)}
		</figure>
	);
}
