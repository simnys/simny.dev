import { cn } from '@/lib/utils';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import CardOverlay from './CardOverlay';

interface CardProps {
	href: string;
	image?: string | StaticImport;
	imageMeta?: {
		blur: string;
		width: number;
		height: number;
	} | null;
	children: React.ReactNode;
	className?: string;
}

function Card({ image, imageMeta, href, children, className }: CardProps) {
	const isExternalLink = href.startsWith('https://');

	return (
		<Link
			href={href}
			target={isExternalLink ? '_blank' : ''}
			rel={isExternalLink ? 'noopener noreferrer' : ''}
			className={cn(
				'flex flex-col flex-1 group ring-1 ring-border rounded-2xl overflow-hidden',
				'transition-colors bg-background-secondary/60 hover:bg-background-secondary/20 dark:hover:bg-background-secondary'
			)}
		>
			<div
				className={cn(
					'relative h-[180px] m-1.5 mb-2 rounded-xl border shadow-inner overflow-hidden bg-background',
					className
				)}
			>
				{image && (
					<Image
						src={image}
						alt=""
						width={imageMeta?.width}
						height={imageMeta?.height}
						placeholder={imageMeta?.blur ? 'blur' : undefined}
						blurDataURL={imageMeta?.blur}
						loading="lazy"
						className="object-cover w-full h-full object-center"
					/>
				)}
				<div className="absolute inset-0 w-full h-full z-10 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
				<CardOverlay withIcon />
			</div>

			{children}
		</Link>
	);
}

interface CardBodyProps {
	title: string;
	icon?: React.ComponentType<React.SVGAttributes<SVGElement>>;
	className?: string;
	children: React.ReactNode;
}
function CardBody({ title, icon: Icon, className, children }: CardBodyProps) {
	return (
		<>
			<div className="px-4 py-2 flex gap-x-2 justify-between items-center">
				<h3 className="text-base text-pretty">{title}</h3>
				{Icon && <Icon className="w-4 h-4 text-foreground-tertiary/80" />}
			</div>

			<p className={cn('px-4 mb-4 text-foreground-secondary', className)}>{children}</p>
		</>
	);
}

interface CardFooterProps {
	className?: string;
	children: React.ReactNode;
}
function CardFooter({ className, children }: CardFooterProps) {
	return (
		<div
			className={cn(
				'mt-auto border-t px-4 py-3 flex gap-x-2 items-center text-sm text-foreground-tertiary',
				'overflow-x-auto whitespace-nowrap no-scrollbar mask-[linear-gradient(to_right,white_90%,transparent)]',
				className
			)}
		>
			{children}
		</div>
	);
}

export { Card, CardBody, CardFooter };
