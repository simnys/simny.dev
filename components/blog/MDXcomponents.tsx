import { slugify } from '@/lib/utils';
import React from 'react';

import Callout from './Callout';
import Code from './Code';
import CustomImage from './Image';
import CustomLink from './Link';
import Divider from './Divider';

// Helper to set displayName on components
function withDisplayName<T extends React.ComponentType<any>>(Comp: T, name: string): T {
	return Object.assign(Comp, { displayName: name });
}

// Creates anchor links for all headings
const createHeading = (level: number) => {
	const HeadingComponent = ({ children }: any) => {
		let slug = slugify(children);

		return (
			<a
				href={`#${slug}`}
				key={`link-${slug}`}
				className="no-underline inline-block"
				draggable={false}
				tabIndex={-1}
			>
				{React.createElement(`h${level}`, { key: slug, id: slug, className: 'anchor' }, children)}
			</a>
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
	Callout,
};
export default MDXComponents;
