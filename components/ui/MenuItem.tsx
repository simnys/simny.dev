import { NavItem } from '@/lib/types/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Icon } from './Icon';

interface MenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
	navItem: NavItem;
	onClose: () => void;
	isCurrentPath: boolean;
	as?: any;
	className?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
	navItem,
	onClose,
	isCurrentPath,
	as: Component = Link,
}: MenuItemProps) => {
	const isExternalLink = navItem.path.startsWith('https://');

	return (
		<Component
			href={navItem.path}
			target={isExternalLink ? '_blank' : ''}
			rel={isExternalLink ? 'noopener noreferrer' : ''}
			className={cn(
				'relative  text-foreground flex gap-x-2 items-center px-3 py-1.5 rounded-lg',
				isCurrentPath && 'text-foreground bg-background-tertiary font-medium'
			)}
			onClick={() => Component === Link && onClose()}
		>
			{navItem.icon && <Icon name={navItem.icon} className="size-4" />}
			{navItem.name}
		</Component>
	);
};

MenuItem.displayName = 'MenuItem';
export default MenuItem;
