'use client';

import { useScreenBreakpoints } from '@/lib/hooks';
import { GalleryCollection, GalleryImage, StaticImage } from '@/lib/types';

import { motion } from 'framer-motion';
import { useState } from 'react';

import GalleryItem from '../ui/GalleryItem';
import Lightbox from '../ui/Lightbox';

type Props = {
	content: (GalleryImage | GalleryCollection)[];
	as?: 'images' | 'collections';
};

export default function GalleryView({ content, as = 'images' }: Props) {
	const { isSmall, isMedium } = useScreenBreakpoints();
	const [showLightbox, setShowLightbox] = useState<boolean>(false);
	const [lightboxIndex, setLightboxIndex] = useState<number>(0);

	const columns: (GalleryImage | GalleryCollection)[][] = [[], [], []];
	content?.forEach((item, index) => {
		columns[index % (isSmall ? 1 : isMedium ? 2 : 3)].push(item);
	});

	const calculateLightboxIndex = (colIndex: number, n: number) => {
		const start = isSmall ? 1 : isMedium ? 2 : 3;
		return colIndex + start * n;
	};

	const handleImageClick = (e: any, lightboxIndex: number) => {
		setLightboxIndex(lightboxIndex);
		setShowLightbox(true);
	};

	return (
		<>
			<div className="pt-2 px-2 grid sm:grid-cols-2 md:grid-cols-3 gap-2">
				{columns.map((col, colIndex: number) => {
					return (
						<div key={colIndex} className="flex flex-col gap-2 relative">
							{col.map((item, idx) => (
								<motion.div
									key={idx}
									initial={
										idx < 2
											? false
											: {
													opacity: 0,
													y: 50,
											  }
									}
									whileInView={{
										opacity: 1,
										y: 0,
									}}
									viewport={{ once: true, amount: 0.1 }}
									transition={{
										duration: 0.6,
										delay: colIndex * 0.1 + idx * 0.05, // Stagger by column and row
										ease: 'easeOut',
									}}
									className="will-change-transform overflow-hidden"
								>
									<GalleryItem
										isCollection={as === 'collections'}
										item={
											as === 'collections'
												? ((item as GalleryCollection).cover as StaticImage)
												: (item as GalleryImage)
										}
										collectionTitle={as === 'collections' ? (item as GalleryCollection).title : ''}
										collectionSize={as === 'collections' ? (item as GalleryCollection).length : 0}
										priority={idx <= 2 ? true : false}
										lightboxIndex={calculateLightboxIndex(colIndex, idx)}
										handleImageClick={handleImageClick}
									/>
								</motion.div>
							))}
						</div>
					);
				})}
			</div>

			{as === 'images' && (
				<Lightbox
					content={content.filter((item): item is GalleryImage => 'src' in item)}
					current={lightboxIndex}
					setCurrent={setLightboxIndex}
					isVisible={showLightbox}
					onClose={() => setShowLightbox(false)}
				/>
			)}
		</>
	);
}
