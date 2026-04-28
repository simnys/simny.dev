'use client';

import { GalleryImage } from '@/lib/types/types';
import { useScrollLock } from '@/lib/hooks';
import { AnimatePresence, motion } from 'framer-motion';
import { CldImage } from 'next-cloudinary';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import { FocusTrap } from 'focus-trap-react';

type Props = {
	content: Array<GalleryImage>;
	current: number;
	setCurrent: React.Dispatch<React.SetStateAction<number>>;
	isVisible: boolean;
	onClose: () => void;
};

export default function Lightbox({ content, current, setCurrent, isVisible, onClose }: Props) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [direction, setDirection] = useState<1 | -1>(1);
	useScrollLock(isVisible);

	const currentImage = content[current];

	const showNext = useCallback(
		(event?: { stopPropagation?: () => void }) => {
			event?.stopPropagation?.();
			setDirection(1);
			setIsLoading(true);
			setCurrent((prevIndex) => (prevIndex + 1) % content.length);
		},
		[content.length, setCurrent],
	);

	const showPrev = useCallback(
		(event?: { stopPropagation?: () => void }) => {
			event?.stopPropagation?.();
			setDirection(-1);
			setIsLoading(true);
			setCurrent((prevIndex) => (prevIndex - 1 + content.length) % content.length);
		},
		[content.length, setCurrent],
	);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
			if (e.key === 'ArrowLeft') showPrev(e);
			if (e.key === 'ArrowRight') showNext(e);
		},
		[onClose, showNext, showPrev],
	);

	useEffect(() => {
		if (!isVisible || !currentImage) {
			return;
		}

		const adjacentIndexes = [
			(current + 1) % content.length,
			(current - 1 + content.length) % content.length,
		];

		adjacentIndexes.forEach((index) => {
			const image = new window.Image();
			image.src = content[index].src;
		});
	}, [content, current, currentImage, isVisible]);

	useEffect(() => {
		const container = containerRef.current;
		if (isVisible) {
			window.addEventListener('keydown', handleKeyDown);
			container?.focus();
		}

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleKeyDown, isVisible]);

	if (!content.length) {
		return null;
	}

	return (
		<AnimatePresence>
			{isVisible && (
				<FocusTrap>
					<motion.div
						role="dialog"
						aria-modal="true"
						aria-label="Image lightbox"
						className="fixed z-100 top-0 left-0 w-full h-full flex justify-center bg-background/90"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<div
							ref={containerRef}
							onClick={() => onClose()}
							tabIndex={-1}
							className="fixed z-100 top-0 left-0 w-full h-full flex items-center justify-center outline-none ring-0 p-6 sm:p-16"
						>
							<AnimatePresence initial={false} mode="wait">
								<motion.div
									key={currentImage.id}
									onClick={(event) => event.stopPropagation()}
									initial={{ x: direction > 0 ? 64 : -64, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									exit={{ x: direction > 0 ? -64 : 64, opacity: 0 }}
									transition={{ duration: 0.22, ease: 'easeOut' }}
									drag="x"
									dragConstraints={{ left: 0, right: 0 }}
									onDragEnd={(event, info) => {
										if (info.offset.x < -100) {
											showNext(event);
										} else if (info.offset.x > 100) {
											showPrev(event);
										}
									}}
									className="relative flex h-full w-full items-center justify-center"
								>
									<CldImage
										src={currentImage.src}
										alt={currentImage.alt ?? ''}
										width={currentImage.width}
										height={currentImage.height}
										loading="eager"
										draggable={false}
										className="h-full w-full object-contain transition-opacity duration-200 ease-out"
										style={{ opacity: isLoading ? 0 : 1 }}
										onLoad={() => setIsLoading(false)}
									/>
								</motion.div>
							</AnimatePresence>

							<div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
								<div className="rounded-full bg-background/80 px-3 py-1 text-sm text-foreground-secondary shadow-xs backdrop-blur-sm">
									{current + 1} / {content.length}
								</div>
							</div>
						</div>

						<button
							type="button"
							aria-label="Next image"
							className="absolute z-110 right-6 top-10 md:top-1/2 md:-translate-y-1/2 w-fit p-2 rounded-full bg-foreground-secondary/5 text-foreground-secondary ring-1 ring-transparent ring-offset-background transition-all hover:bg-foreground-secondary/10 hover:text-foreground hover:ring-brand hover:ring-offset-2 active:scale-95 active:ring-offset-1 cursor-pointer select-none"
							onClick={(e) => showNext(e)}
						>
							<Icon name="arrow" className="w-5 h-5" />
						</button>
						<button
							type="button"
							aria-label="Previous image"
							className="absolute z-110 left-6 top-10 md:top-1/2 md:-translate-y-1/2 w-fit p-2 rounded-full bg-foreground-secondary/5 text-foreground-secondary ring-1 ring-transparent ring-offset-background transition-all hover:bg-foreground-secondary/10 hover:text-foreground hover:ring-brand hover:ring-offset-2 active:scale-95 active:ring-offset-1 cursor-pointer select-none"
							onClick={(e) => showPrev(e)}
						>
							<Icon name="arrow" className="w-5 h-5 rotate-180" />
						</button>
					</motion.div>
				</FocusTrap>
			)}
		</AnimatePresence>
	);
}
