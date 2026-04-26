import { IconName } from '@/lib/types/icons';
import { cn } from '@/lib/utils';
import { Icon } from './Icon';

interface CardProps {
	link?: string;
	title: string;
	body?: string;
	subtitle?: string;
	icon?: IconName;
}

export const Card = ({ item, className }: { item: CardProps; className?: string }) => {
	return (
		<a
			href={item.link}
			target="_blank"
			rel="noopener noreferrer"
			className={cn(
				'relative w-full h-[240px] bg-background-secondary p-4 rounded-xl border border-border shadow-xs flex flex-col',
				'group transition-colors duration-200 ease-out hover:bg-background dark:hover:bg-background-tertiary',
				className,
			)}
		>
			<div className="grow flex items-center justify-center mt-6">
				<Icon name={item.icon ?? 'code'} className="size-9" />
			</div>
			<div>
				{item.subtitle && (
					<span className="inline-block text-sm text-foreground-tertiary">{item.subtitle}</span>
				)}
				<h3>{item.title}</h3>
				<p className="text-sm text-foreground-tertiary line-clamp-2 leading-relaxed">{item.body}</p>
			</div>
		</a>
	);
};
