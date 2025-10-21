import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';

interface PageHeaderProps {
	title: string;
	content?: string;
	backlink?: string;
	className?: string;
}

export default function PageHeader({ title, content, backlink, className }: PageHeaderProps) {
	return (
		<>
			<div className={cn('relative mt-16 sm:mt-20 space-y-1 text-balance', className)}>
				<h1>{title}</h1>
				{content && <p className="text-foreground-secondary">{content}</p>}
			</div>
			{backlink && (
				<Button asChild size="icon" variant="secondary">
					<Link href={backlink} draggable={false} className="absolute inset-6 rounded-full">
						<Icon name="back" className="-rotate-90" />
					</Link>
				</Button>
			)}
		</>
	);
}
