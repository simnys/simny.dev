import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import { Icon } from '../ui/Icon';
import { IconName } from '@/lib/types/icons';

const cLinkBase =
	'relative items-center gap-x-0.5 underline underline-offset-3 text-foreground font-medium decoration-foreground-tertiary/50 hover:decoration-foreground-secondary transition-colors';

interface CustomLinkProps extends React.DetailedHTMLProps<
	React.AnchorHTMLAttributes<HTMLAnchorElement>,
	HTMLAnchorElement
> {
	icon?: IconName;
	flipIcon?: boolean;
	className?: string;
}

export default function CustomLink(props: CustomLinkProps) {
	const href = props?.href as string;

	if (href.startsWith('/')) {
		return (
			<Link href={href} className={cn(cLinkBase, props.className)}>
				{props.icon && (
					<Icon
						name={props.icon}
						className={cn('inline-block size-4 mr-1 ml-0.5 mb-0.5', props.flipIcon && '-rotate-90')}
					/>
				)}
				{props.children}
			</Link>
		);
	}
	if (href.startsWith('#')) {
		return <a {...props}>{props.children}</a>;
	}
	return (
		<Link
			href={href}
			target="_blank"
			rel="noopener"
			className={cn(cLinkBase, 'group', props.className)}
		>
			{props.icon && <Icon name={props.icon} className="inline-block size-4 mr-1 ml-0.5 mb-0.5" />}

			{props.children}

			{!props.icon && (
				<span className="inline-block overflow-hidden relative">
					<Icon
						name="external"
						className="size-4 group-hover:-translate-y-4 group-hover:translate-x-4 transition-transform duration-200 ease-out"
					/>
					<Icon
						name="external"
						className="absolute bottom-0 right-0 size-4 translate-y-4 -translate-x-4 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-200 ease-out"
					/>
				</span>
			)}
		</Link>
	);
}
