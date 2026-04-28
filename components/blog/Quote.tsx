import { cn } from '@/lib/utils';
import React from 'react';
import CustomLink from './Link';

interface QuoteProps extends React.ComponentPropsWithoutRef<'blockquote'> {
	children: React.ReactNode;
	author?: React.ReactNode;
	source?: React.ReactNode;
	sourceHref?: string;
	className?: string;
}

export default function Quote({
	children,
	author,
	source,
	sourceHref,
	className,
	...props
}: QuoteProps) {
	return (
		<figure className="my-12 sm:my-16">
			<blockquote
				className={cn(
					'not-prose relative font-serif not-italic text-xl md:text-2xl text-foreground leading-relaxed [&>p]:inline',
					className,
				)}
				{...props}
			>
				<span
					className="text-3xl md:text-4xl text-foreground/80 absolute -left-4"
					aria-hidden="true"
				>
					“
				</span>

				{children}

				<span
					className="text-3xl md:text-4xl text-foreground/80 absolute translate-x-1"
					aria-hidden="true"
				>
					”
				</span>
			</blockquote>

			{(author || source) && (
				<figcaption className="ml-auto mt-5 flex w-full items-center md:justify-end gap-3">
					<span className="hidden h-px w-24 bg-border md:block" aria-hidden="true" />
					<div className="flex flex-col md:flex-row md:items-center text-foreground-secondary">
						{author && <cite className="text-foreground font-medium">{author}</cite>}
						{author && source && (
							<span aria-hidden="true" className="hidden md:block">
								,
							</span>
						)}
						{source &&
							(sourceHref ? (
								<CustomLink
									href={sourceHref}
									className="text-sm md:ml-0.5 no-underline text-foreground-tertiary"
								>
									{source}
								</CustomLink>
							) : (
								<span className="text-sm md:ml-0.5 text-foreground-tertiary">{source}</span>
							))}
					</div>
				</figcaption>
			)}
		</figure>
	);
}
