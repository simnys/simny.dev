'use client';

import { StaticImage } from '@/lib/types';
import { cn } from '@/lib/utils';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

type Props = {
	items: Array<StaticImage>;
	className?: string;
};

export default function HorizontalImages({ items, className }: Props) {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start end', 'end start'],
	});
	const x = useTransform(scrollYProgress, [0, 1], [0, -1200]); // Adjust the values as needed
	const spring = useSpring(x, { stiffness: 150, damping: 30 });

	return (
		<div className={cn('flex justify-center overflow-x-clip', className)}>
			<motion.div
				ref={containerRef}
				style={{ x: spring, rotate: '-3deg' }}
				className="w-screen flex justify-center gap-2 max-h-64"
			>
				{items.map((item, idx) => (
					<Image
						key={idx}
						src={item.src}
						alt={item.alt ?? ''}
						width={210}
						height={270}
						placeholder="blur"
						blurDataURL={item.blurData}
						className="h-full w-auto border border-black rounded-xl"
					/>
				))}
			</motion.div>
		</div>
	);
}
