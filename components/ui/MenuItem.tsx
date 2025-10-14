import { NavItem } from '@/lib/types/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface MenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
	navItem: NavItem;
	idx: number;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isCurrentPath: boolean;
	as?: any;
	className?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
	navItem,
	idx,
	setIsOpen,
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
				'text-xl tracking-normal px-4 py-2 font-medium text-foreground-secondary',
				isCurrentPath &&
					'text-foreground underline underline-offset-4 decoration-2 decoration-brand/80'
			)}
			onClick={() => Component === Link && setIsOpen(false)}
		>
			{navItem.name}
		</Component>
	);
};

MenuItem.displayName = 'MenuItem';
export default MenuItem;
