import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { IconName } from './icons';
import { Technology } from '@/data/projects';

export type Project = {
	title: string;
	description: string;
	date?: string;
	icon?: IconName;
	technologies?: Array<Technology | string>;
	link?: string;
	repoLink?: string;
	image?: string | StaticImport;
};

export type GalleryCollection = {
	title: string;
	description: string;
	cover: StaticImage | string;
	length: number;
};

export type GalleryCollectionSeed = Omit<GalleryCollection, 'cover' | 'length'> & {
	cover: string;
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
	description?: string;
	icon?: IconName;
	iconActive?: IconName;
	rowSpan?: number;
};
