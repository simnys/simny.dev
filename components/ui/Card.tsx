import { cn } from '@/lib/utils';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import CardOverlay from './CardOverlay';
import { Icon } from './Icon';
import { IconName } from '@/lib/types/icons';

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
				'flex flex-col flex-1 group rounded-xl border shadow-xs overflow-hidden',
				'transition-colors duration-200 ease-out bg-background-secondary hover:bg-background dark:hover:bg-background-tertiary'
			)}
		>
			<div
				className={cn(
					'relative h-[180px] m-1.5 rounded-lg border shadow-inner overflow-hidden bg-background',
					className
				)}
			>
				{/* {image && (
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
				)} */}
			</div>

			{children}
		</Link>
	);
}

interface CardBodyProps {
	title: string;
	icon?: IconName;
	className?: string;
	children: React.ReactNode;
}
function CardBody({ title, icon, className, children }: CardBodyProps) {
	return (
		<div className="py-2 px-3 mb-2">
			<div className="mb-1 flex gap-x-2 justify-between items-center">
				<h3 className="text-pretty">{title}</h3>
				{icon && <Icon name={icon} className="text-foreground-tertiary" />}
			</div>

			<p className={cn('text-foreground-secondary', className)}>{children}</p>
		</div>
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
