import { slugify } from '@/lib/utils';
import React from 'react';

import Callout from './Callout';
import Code from './Code';
import CustomImage from './Image';
import CustomLink from './Link';
import Preview from './Preview';
import { Step, Steps } from './Steps';
import Tabs from './Tabs';
import Divider from './Divider';

// Helper to set displayName on components
function withDisplayName<T extends React.ComponentType<any>>(Comp: T, name: string): T {
	return Object.assign(Comp, { displayName: name });
}

// Creates anchor links for all headings
const createHeading = (level: number) => {
	const HeadingComponent = ({ children }: any) => {
		let slug = slugify(children);
		return React.createElement(
			`h${level}`,
			{ id: slug, className: 'scroll-mt-12' },
			[
				React.createElement('a', {
					href: `#${slug}`,
					key: `link-${slug}`,
					className: 'anchor',
					tabIndex: -1,
				}),
			],
			children
		);
	};
	HeadingComponent.displayName = `Heading${level}`;
	return HeadingComponent;
};

const MDXComponents = {
	h1: createHeading(1),
	h2: createHeading(2),
	h3: createHeading(3),
	h4: createHeading(4),
	h5: createHeading(5),
	h6: createHeading(6),
	a: CustomLink,
	figure: (props: any) => Code(props),
	Image: CustomImage,
	Divider,
	Preview,
	Tabs,
	Callout,
	Steps,
	Step,
};
export default MDXComponents;
