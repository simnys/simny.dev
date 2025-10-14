import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { ComponentType, SVGProps } from 'react';
import { IconName } from './icons';

export type Project = {
	title: string;
	description: string;
	stack: Array<string>;
	githubLink: string;
	deployLink?: string;
	image?: string | StaticImport;
};

export type GalleryCollection = {
	title: string;
	description: string;
	cover: StaticImage | string;
	length: number;
};
export type GalleryImage = {
	id: string;
	src: string;
	blurData: string;
	width: number;
	height: number;
	alt?: string;
	tags: string[];
};
export type StaticImage = {
	src: string;
	blurData: string;
	alt: string;
};

export type NavItem = {
	name: string;
	path: string;
	icon?: IconName;
	description?: string;
	colSpan?: number;
	rowSpan?: number;
};
export type Navigation = {
	navigationLinks: NavItem[];
	exploreLinks: NavItem[];
	connectLinks: NavItem[];
	socialLinks: NavItem[];
};
