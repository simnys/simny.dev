import React from 'react';
import Copy from '../ui/Copy';
import { Icon } from '../ui/Icon';

interface CodeProps {
	children: React.ReactNode;
}

// Adds a header to all codeblocks with copy functionality
export default function Code({ children, ...props }: CodeProps) {
	if (!('data-rehype-pretty-code-figure' in props)) return <figure>{children}</figure>;

	// Convert children to an array for manipulation
	const childrenArray = React.Children.toArray(children);

	// Determine text to be copied
	const pre = findOrRemoveChildByType<React.ReactElement<any>>(childrenArray, 'pre', 'find');
	const codeText = extractText(pre?.props.children);

	// Check for existing title
	const figcaption = findOrRemoveChildByType<React.ReactElement<any>>(
		childrenArray,
		'figcaption',
		'find',
	);

	// Filter out existing title to replace with common one
	const filteredChildren = findOrRemoveChildByType<React.ReactElement<any>>(
		childrenArray,
		'figcaption',
		'extract',
	);

	// Codeblocks styled in globals.css
	return (
		<figure {...props} className="relative group">
			{figcaption && (
				<figcaption data-rehype-pretty-code-title>{figcaption?.props.children}</figcaption>
			)}

			{filteredChildren}

			<Copy
				successMessage={<Icon name="check" className="text-brand size-4" />}
				toCopy={codeText}
				className="absolute top-1 right-1 size-8 p-0"
			>
				<Icon name="copy" className="size-4" />
			</Copy>
		</figure>
	);
}

// Helper function to find or remvoe a child by its type
const findOrRemoveChildByType = <T,>(
	children: React.ReactNode[],
	type: string,
	mode: 'find' | 'extract',
): T | undefined => {
	if (mode == 'find') {
		return children.find((child) => React.isValidElement(child) && child.type === type) as
			| T
			| undefined;
	} else {
		return children.filter((child) => !(React.isValidElement(child) && child.type === type)) as
			| T
			| undefined;
	}
};

// Helper function to extract text from nested React elements
const extractText = (node: React.ReactNode): string => {
	if (typeof node === 'string') {
		return node;
	}

	if (Array.isArray(node)) {
		return node.map(extractText).join('');
	}

	if (
		React.isValidElement(node) &&
		node.props &&
		(node.props as { children?: React.ReactNode }).children
	) {
		return extractText((node.props as { children?: React.ReactNode }).children);
	}

	return '';
};
