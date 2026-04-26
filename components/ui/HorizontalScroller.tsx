'use client';

import { cn } from '@/lib/utils';
import { Fragment, useEffect, useRef, useState } from 'react';

interface ScrollerProps {
	items: Array<any>;
	separator?: string;
	pauseOnHover?: boolean;
	speed?: 'normal' | 'slow';
	children?: React.ReactNode;
	className?: string;
}

export default function HorizontalScroller({
	items,
	separator,
	pauseOnHover = true,
	speed = 'normal',
	children,
	className,
}: ScrollerProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const scrollerRef = useRef<HTMLUListElement>(null);
	const [start, setStart] = useState(false);

	useEffect(() => {
		addAnimation();
	}, []);

	const addAnimation = () => {
		if (containerRef.current && scrollerRef.current) {
			const scrollerContent = Array.from(scrollerRef.current.children);

			scrollerContent.forEach((item) => {
				const duplicatedItem = item.cloneNode(true);
				if (scrollerRef.current) {
					scrollerRef.current.appendChild(duplicatedItem);
				}
			});

			setStart(true);
		}
	};

	return (
		<div
			ref={containerRef}
			className={cn(
				'scroller relative overflow-hidden mask-[linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
				className,
			)}
		>
			<ul
				ref={scrollerRef}
				className={cn(
					'flex w-max gap-2 items-center',
					start && (speed == 'normal' ? 'animate-loop' : 'animate-loop'),
					pauseOnHover && 'hover:[animation-play-state:paused]',
				)}
			>
				{items.map((item: any, idx: number) => (
					<Fragment key={idx}>
						<li>{item}</li>
						{separator && <span className="text-foreground-tertiary">{separator}</span>}
					</Fragment>
				))}
			</ul>
		</div>
	);
}
