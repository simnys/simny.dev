import { IconName } from '@/lib/types/icons';
import { cn } from '@/lib/utils';

type IconProps = React.SVGAttributes<SVGSVGElement> & {
	name: IconName;
};

export const Icon = ({ name, ...props }: IconProps) => (
	<svg
		width={20}
		height={20}
		aria-hidden="true"
		{...props}
		className={cn('shrink-0', props.className)}
	>
		<use href={`/icons/sprite.svg?v=1.0.8#${name}`} />
	</svg>
);
