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
	assetPath: string;
};

export default async function CustomImage({
	src,
	alt,
	caption,
	priority = false,
	assetPath,
}: CustomImageProps) {
	if (!src) return;

	const buffer = await readFile(`public/${assetPath}/${src}`);
	const { base64, metadata } = await getPlaiceholder(buffer);

	return (
		<figure>
			<Image
				src={`/${assetPath}/${src}`}
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
