import { cn } from '@/lib/utils';
import { forwardRef, cloneElement, isValidElement } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonSize = 'default' | 'icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	icon?: React.ReactNode;
	iconPosition?: 'left' | 'right';
	isActive?: boolean;
	asChild?: boolean;
}

const getVariantStyles = (variant: ButtonVariant) => {
	const variants = {
		primary: 'bg-foreground text-background hover:bg-foreground/90',
		secondary:
			'bg-background-tertiary text-foreground-tertiary hover:bg-background-quaternary hover:text-foreground active:scale-97',
		ghost:
			'text-foreground-tertiary border border-transparent hover:text-foreground hover:bg-background-tertiary active:scale-97 active:border-border active:shadow-inner',
	};
	return variants[variant];
};

const getSizeStyles = (size: ButtonSize) => {
	const sizes = {
		default: 'h-10 px-4',
		icon: 'size-10',
	};
	return sizes[size];
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant = 'primary',
			size = 'default',
			icon,
			iconPosition = 'left',
			isActive,
			asChild = false,
			children,
			...props
		},
		ref
	) => {
		const isIconOnly = !children && icon;

		// Auto-adjust for icon-only buttons
		const adjustedSize = isIconOnly && size === 'default' ? 'icon' : size;
		const adjustedVariant = isIconOnly && variant === 'primary' ? 'ghost' : variant;

		const renderContent = () => {
			if (isIconOnly) {
				return icon;
			}

			if (icon && children) {
				return (
					<>
						{iconPosition === 'left' && icon}
						<span>{children}</span>
						{iconPosition === 'right' && icon}
					</>
				);
			}
			return children;
		};

		const buttonClassName = cn(
			// Base styles
			'inline-flex items-center justify-center gap-1 shrink-0',
			'font-medium whitespace-nowrap rounded-lg',
			'transition-all duration-200 ease-out cursor-pointer',
			// Variant and size styles
			getVariantStyles(adjustedVariant),
			getSizeStyles(adjustedSize),
			// Active state
			isActive && 'text-foreground bg-background-secondary border-border shadow-inner',
			className
		);

		if (asChild && isValidElement(children)) {
			// When asChild is true, we clone the child element with button styles
			return cloneElement(children, {
				className: cn(buttonClassName, (children.props as any).className),
				children: (
					<>
						{icon && iconPosition === 'left' && icon}
						{(children.props as any).children}
						{icon && iconPosition === 'right' && icon}
					</>
				),
			} as any);
		}

		return (
			<button ref={ref} className={buttonClassName} {...props}>
				{renderContent()}
			</button>
		);
	}
);

Button.displayName = 'Button';
