import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import { Icon } from '../ui/Icon';

const cLinkBase =
	'c-link relative inline-flex items-center gap-x-0.5 no-underline whitespace-nowrap text-foreground hover:text-brand transition-colors before:c-link-border hover:before:translate-y-1 hover:before:bg-transparent hover:before:transform-gpu';

interface CustomLinkProps
	extends React.DetailedHTMLProps<
		React.AnchorHTMLAttributes<HTMLAnchorElement>,
		HTMLAnchorElement
	> {
	className?: string;
}

export default function CustomLink(props: CustomLinkProps) {
	const href = props?.href as string;

	if (href.startsWith('/')) {
		return (
			<Link href={href} className={cn(cLinkBase, props.className)}>
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
			rel="noopener noreferrer"
			className={cn(cLinkBase, 'group', props.className)}
		>
			{props.children}
			<span className="overflow-hidden relative">
				<Icon
					name="external"
					className="w-4 h-4 group-hover:-translate-y-5 group-hover:translate-x-5 transition-transform"
				/>
				<Icon
					name="external"
					className="absolute bottom-0 right-0  w-4 h-4 translate-y-5 -translate-x-5 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform"
				/>
			</span>
		</Link>
	);
}
