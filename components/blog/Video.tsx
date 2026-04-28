'use client';

import { cn } from '@/lib/utils';
import React, { useRef, useState } from 'react';

type CustomVideoProps = {
	src: string;
	caption?: React.ReactNode | string;
	poster?: string;
	title?: string;
	className?: string;
};

const BLOG_VIDEO_DIR = '/assets/writing';

function getVideoType(src: string) {
	const extension = src.split('.').pop()?.toLowerCase();

	switch (extension) {
		case 'mp4':
			return 'video/mp4';
		case 'webm':
			return 'video/webm';
		case 'ogg':
		case 'ogv':
			return 'video/ogg';
		default:
			return undefined;
	}
}

export default function CustomVideo({ src, caption, poster, title, className }: CustomVideoProps) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isPlaying, setIsPlaying] = useState(true);

	const videoSrc = `${BLOG_VIDEO_DIR}/${src}`;
	const posterSrc = poster ? `${BLOG_VIDEO_DIR}/${poster}` : undefined;
	const videoType = getVideoType(src);

	const togglePlayback = async () => {
		const video = videoRef.current;
		if (!video) return;

		if (video.paused) {
			await video.play();
			setIsPlaying(true);
			return;
		}

		video.pause();
		setIsPlaying(false);
	};

	return (
		<figure>
			<div className="relative overflow-hidden w-full rounded-xl border shadow-xs bg-background-secondary">
				<video
					ref={videoRef}
					className={cn('not-prose w-full h-auto object-cover', className)}
					poster={posterSrc}
					title={title}
					autoPlay
					loop
					muted
					playsInline
					controls={false}
					preload="metadata"
					onPlay={() => setIsPlaying(true)}
					onPause={() => setIsPlaying(false)}
				>
					<source src={videoSrc} type={videoType} />
					Your browser does not support the video.
				</video>

				<button
					type="button"
					onClick={togglePlayback}
					className="group absolute inset-0 z-10 cursor-pointer"
					aria-label={isPlaying ? 'Pause video' : 'Play video'}
				>
					<span
						className={cn(
							'pointer-events-none absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full',
							'bg-black/40 text-white backdrop-blur-sm transition-all duration-200',
							isPlaying
								? 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100'
								: 'opacity-100 scale-100',
						)}
						aria-hidden="true"
					>
						{isPlaying ? (
							<svg viewBox="0 0 24 24" className="size-8 fill-current">
								<path d="M7 5h3v14H7zm7 0h3v14h-3z" />
							</svg>
						) : (
							<svg viewBox="0 0 24 24" className="size-8 fill-current">
								<path d="M8 5.14v13.72c0 .72.78 1.17 1.4.81l10.2-6.86a.94.94 0 0 0 0-1.62L9.4 4.33A.94.94 0 0 0 8 5.14Z" />
							</svg>
						)}
					</span>
				</button>
			</div>
			{caption && (
				<figcaption className={cn('text-xs text-center text-foreground-tertiary')}>
					{caption}
				</figcaption>
			)}
		</figure>
	);
}
