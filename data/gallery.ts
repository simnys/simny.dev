import { GalleryCollection } from '@/lib/types/types';

export const GALLERY_FOLDER_PATH = 'gallery';
export const GALLERY_COVER_TAG = 'role:cover';
export const GALLERY_COLLECTIONS_TAG_PREFIX = 'collections:';

export const galleryCollections = [
	{
		title: 'Highlands',
		description:
			'Taken during a trip to the Scottish Highlands in 2025. A mix of landscapes and candid moments.',
		cover:
			'https://res.cloudinary.com/snystrom/image/upload/v1758113064/gallery/highlands-5_az4h0q.jpg',
	},
	{
		title: 'Australia',
		description: 'Documented from travels while living in Melbourne in 2023.',
		cover: 'https://res.cloudinary.com/snystrom/image/upload/v1717196388/gallery/gatta_pubfyq.jpg',
	},
	{
		title: 'Sweden',
		description: 'A living collection of photos taken in my home country.',
		cover: 'https://res.cloudinary.com/snystrom/image/upload/v1717196384/gallery/red_k2egy3.jpg',
	},
	{
		title: 'Norway',
		description:
			'Combination of images taken from multiple trips over the years and when I was living in Bergen in 2019.',
		cover:
			'https://res.cloudinary.com/snystrom/image/upload/v1717196383/gallery/preikestolen_f6xdrk.jpg',
	},
	{
		title: 'Adventure',
		description:
			'A collection of adventurous moments captured during various trips and outdoor activities.',
		cover: 'https://res.cloudinary.com/snystrom/image/upload/v1717196385/gallery/dad_qbgvgt.jpg',
	},
] as Array<GalleryCollection>;
