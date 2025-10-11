import { IconBack } from '@/data/icons';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ComponentType, SVGProps } from 'react';

interface PageHeaderProps {
	title: string;
	content?: string;
	backlink?: string;
	className?: string;
}

export default function PageHeader({ title, content, backlink, className }: PageHeaderProps) {
	return (
		<>
			<div className={cn('relative pt-12 bg-background text-balance', className)}>
				<h1 className="mb-2">{title}</h1>
				{content && <p className="text-foreground-secondary">{content}</p>}

				{backlink && (
					<Link
						href={backlink}
						draggable={false}
						className={cn(
							'absolute -top-2 -left-2 w-fit p-1.5 rounded-full',
							'bg-background-secondary text-foreground-tertiary',
							'transition-[colors, scale] duration-200 ease-out hover:bg-background-tertiary hover:text-foreground active:scale-95'
						)}
					>
						<IconBack className="w-5 h-5 rotate-180" />
					</Link>
				)}
			</div>
		</>
	);
}
