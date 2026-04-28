'use client';

import { useScreenBreakpoints } from '@/lib/hooks';
import { GalleryCollection, GalleryImage, StaticImage } from '@/lib/types/types';

import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

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

	const columnCount = isSmall ? 1 : isMedium ? 2 : 3;
	const columns = useMemo(() => {
		const nextColumns: Array<Array<{ item: GalleryImage | GalleryCollection; index: number }>> =
			Array.from({ length: columnCount }, () => []);

		content.forEach((item, index) => {
			nextColumns[index % columnCount].push({ item, index });
		});

		return nextColumns;
	}, [columnCount, content]);

	const handleImageClick = (index: number) => {
		setLightboxIndex(index);
		setShowLightbox(true);
	};

	return (
		<>
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
				{columns.map((col, colIndex: number) => {
					return (
						<div key={colIndex} className="flex flex-col gap-2 relative">
							{col.map(({ item, index }, idx) => (
								<motion.div
									key={`${colIndex}-${index}`}
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
										lightboxIndex={index}
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
