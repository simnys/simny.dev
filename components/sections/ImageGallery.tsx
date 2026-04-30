'use client';

import { GalleryImageType } from '@/lib/types/types';
import { useState } from 'react';
import GalleryImage from '../ui/GalleryImage';
import Lightbox from '../ui/Lightbox';

type Props = {
	content: GalleryImageType[];
	lazy?: boolean;
};

export default function ImageGallery({ content, lazy }: Props) {
	const [showLightbox, setShowLightbox] = useState(false);
	const [lightboxIndex, setLightboxIndex] = useState(0);

	const handleImageClick = (index: number) => {
		setLightboxIndex(index);
		setShowLightbox(true);
	};

	const total = content.length;

	return (
		<>
			<div className="columns-1 gap-2 sm:columns-2 lg:columns-3">
				{content.map((item, index) => {
					const aboveFold =
						!lazy &&
						(index < 2 ||
							(total > 4 && Math.abs(index - Math.floor(total / 3)) < 2) ||
							(total > 8 && Math.abs(index - Math.floor((2 * total) / 3)) < 2));

					return (
						<div key={item.id} className="mb-2 break-inside-avoid">
							<GalleryImage
								item={item}
								priority={aboveFold}
								lightboxIndex={index}
								onClick={handleImageClick}
							/>
						</div>
					);
				})}
			</div>

			<Lightbox
				content={content}
				current={lightboxIndex}
				setCurrent={setLightboxIndex}
				isVisible={showLightbox}
				onClose={() => setShowLightbox(false)}
			/>
		</>
	);
}
