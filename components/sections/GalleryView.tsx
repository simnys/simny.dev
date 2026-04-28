'use client';

import { GalleryCollection, GalleryImage } from '@/lib/types/types';

import { motion } from 'framer-motion';
import { useState } from 'react';

import GalleryItem from '../ui/GalleryItem';
import Lightbox from '../ui/Lightbox';

type ImageGalleryProps = {
	as: 'images';
	content: GalleryImage[];
};

type CollectionGalleryProps = {
	as: 'collections';
	content: GalleryCollection[];
};

type Props = ImageGalleryProps | CollectionGalleryProps;

export default function GalleryView({ content, as }: Props) {
	const [showLightbox, setShowLightbox] = useState<boolean>(false);
	const [lightboxIndex, setLightboxIndex] = useState<number>(0);

	const handleImageClick = (index: number) => {
		setLightboxIndex(index);
		setShowLightbox(true);
	};

	return (
		<>
			{as === 'collections' ? (
				<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
					{content.map((item, index) => {
						return (
							<motion.div
								key={item.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.24), ease: 'easeOut' }}
							>
								<GalleryItem variant="collection" item={item} priority={index < 3} />
							</motion.div>
						);
					})}
				</div>
			) : (
				<div className="columns-1 gap-2 sm:columns-2 lg:columns-3">
					{content.map((item, index) => {
						return (
							<motion.div
								key={item.id}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.15 }}
								transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.2), ease: 'easeOut' }}
								className="mb-2 break-inside-avoid"
							>
								<GalleryItem
									variant="image"
									item={item}
									priority={index < 3}
									lightboxIndex={index}
									handleImageClick={handleImageClick}
								/>
							</motion.div>
						);
					})}
				</div>
			)}

			{as === 'images' && (
				<Lightbox
					content={content}
					current={lightboxIndex}
					setCurrent={setLightboxIndex}
					isVisible={showLightbox}
					onClose={() => setShowLightbox(false)}
				/>
			)}
		</>
	);
}
