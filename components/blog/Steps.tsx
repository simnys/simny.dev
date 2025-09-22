import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type StepProps = {
	title: string;
	children: ReactNode;
	number?: number;
};

export function Step({ title, children, number }: StepProps) {
	return (
		<div className="flex items-start space-x-2 sm:space-x-4 relative z-10">
			<div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border bg-background-secondary text-foreground font-medium text-sm">
				{number}
			</div>
			<div>
				<h4 className="text-foreground not-prose">{title}</h4>
				<div className="prose-p:mt-2 prose-p:pr-2 prose-figure:mr-2 text-base leading-7">
					{children}
				</div>
			</div>
		</div>
	);
}

type StepsProps = {
	children: ReactNode;
};

export function Steps({ children }: StepsProps) {
	const steps = Array.isArray(children) ? children : [children];

	return (
		<div className="my-5 -mx-2">
			{steps.map((step: any, i) => (
				<div key={i} className="relative">
					<Step title={step.props.title} number={i + 1}>
						{step.props.children}
					</Step>
					<div
						className={cn(
							'absolute top-0 left-4 z-0 h-full w-px bg-border',
							i === steps.length - 1 && 'mask-[linear-gradient(to_top,transparent,white_100%)]'
						)}
					></div>
				</div>
			))}
		</div>
	);
}
