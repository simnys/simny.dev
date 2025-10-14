import { IconName } from '@/lib/types/icons';

type IconProps = React.SVGAttributes<SVGSVGElement> & {
	name: IconName;
};

export const Icon = ({ name, ...props }: IconProps) => (
	<svg width={20} height={20} aria-hidden="true" {...props}>
		<use href={`/icons/sprite.svg#${name}`} />
	</svg>
);
