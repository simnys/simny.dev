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
	useScrollLock(isVisible);

	const showNext = useCallback(
		(event?: { stopPropagation?: () => void }) => {
			event?.stopPropagation?.();
			setIsLoading(true);
			setCurrent((prevIndex) => (prevIndex + 1) % content.length);
		},
		[content.length, setCurrent],
	);

	const showPrev = useCallback(
		(event?: { stopPropagation?: () => void }) => {
			event?.stopPropagation?.();
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
		const handleScroll = () => {
			setTimeout(() => {
				onClose();
			}, 300);
		};

		const container = containerRef.current;
		if (isVisible) {
			window.addEventListener('scroll', handleScroll);
			window.addEventListener('keydown', handleKeyDown);

			container?.focus();
		}

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleKeyDown, isVisible, onClose]);

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
							className="fixed z-100 top-0 left-0 w-full h-full flex items-center justify-center outline-none ring-0 p-6 sm:p-16"
						>
							<motion.div
								initial={{
									y: '100%',
									opacity: 0,
								}}
								animate={{ y: 0, opacity: 1 }}
								exit={{
									y: '100%',
									opacity: 0,
								}}
								transition={{ type: 'spring', stiffness: 200, damping: 30 }}
								drag={'x'}
								dragConstraints={{ left: 0, right: 0 }}
								onDragEnd={(event, info) => {
									if (info.offset.x < -100) {
										showNext(event);
									} else if (info.offset.x > 100) {
										showPrev(event);
									}
								}}
								className="w-full h-full relative"
							>
								<CldImage
									key={content[current].id}
									src={content[current].src}
									alt={content[current].alt ?? ''}
									width={content[current].width}
									height={content[current].height}
									loading="eager"
									draggable={false}
									className="h-full w-full object-contain transition-opacity duration-200 ease-out"
									style={{ opacity: isLoading ? 0 : 1 }}
									onLoad={() => setIsLoading(false)}
								/>
							</motion.div>
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
