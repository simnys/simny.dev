'use client';

import { GalleryImage } from '@/lib/types/types';
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

	const showNext = (e: any) => {
		e.stopPropagation();
		setCurrent((prevIndex) => (prevIndex + 1) % content.length);
	};
	const showPrev = (e: any) => {
		e.stopPropagation();
		setCurrent((prevIndex) => (prevIndex - 1 + content.length) % content.length);
	};

	const handleKeyDown = useCallback((e: any) => {
		if (e.key === 'Escape') onClose();
		if (e.key === 'ArrowLeft') showPrev(e);
		if (e.key === 'ArrowRight') showNext(e);
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			setTimeout(() => {
				onClose();
			}, 300);
		};

		const container = containerRef.current;
		if (isVisible) {
			window.addEventListener('scroll', handleScroll);

			container?.focus();
			container?.addEventListener('keydown', handleKeyDown);
		}

		return () => {
			window.removeEventListener('scroll', handleScroll);
			container?.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleKeyDown, isVisible, onClose]);

	return (
		<AnimatePresence>
			{isVisible && (
				<FocusTrap>
					<motion.div
						className="fixed z-100 top-0 left-0 w-full h-full flex justify-center bg-background/90"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onKeyDown={handleKeyDown}
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
								animate={{ y: !isLoading ? 0 : '100%', opacity: !isLoading ? 1 : 0 }}
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
									src={content[current].src}
									alt={content[current].alt ?? ''}
									width={content[current].width}
									height={content[current].height}
									loading="eager"
									draggable={false}
									className="h-full w-full object-contain"
									onLoad={() => setIsLoading(false)}
								/>
							</motion.div>
						</div>

						<button
							className="absolute z-110 right-6 top-10 md:top-1/2 md:-translate-y-1/2 w-fit p-2 rounded-full bg-foreground-secondary/5 text-foreground-secondary ring-1 ring-transparent ring-offset-background transition-all hover:bg-foreground-secondary/10 hover:text-foreground hover:ring-brand hover:ring-offset-2 active:scale-95 active:ring-offset-1 cursor-pointer select-none"
							onClick={(e) => showNext(e)}
						>
							<Icon name="arrow" className="w-5 h-5" />
						</button>
						<button
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
