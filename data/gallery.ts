import { GalleryCollection } from '@/lib/types/types';

export const GALLERY_FOLDER_PATH = 'gallery';
export const GALLERY_COVER_TAG = 'role:cover';
export const GALLERY_COLLECTIONS_TAG_PREFIX = 'collections:';

export const galleryCollections = [
	{
		title: 'Highlands',
		description:
			'Over the course of 1,000 kilometers on my scooter through Bali in two weeks, I crossed paths with people whose stories rarely get told. These are the faces of the island—fishermen, farmers, construction workers—quietly shaping the rhythm of everyday life. With these images, I want to honor the heart of Bali: the people behind the beauty, often unseen by the tourists passing through.',
		cover:
			'https://res.cloudinary.com/snystrom/image/upload/v1758113064/gallery/highlands-5_az4h0q.jpg',
	},
	{
		title: 'Australia',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. In vel eaque asperiores maiores perferendis eveniet.',
		cover: 'https://res.cloudinary.com/snystrom/image/upload/v1717196388/gallery/gatta_pubfyq.jpg',
	},
	{
		title: 'Sweden',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. In vel eaque asperiores maiores perferendis eveniet.',
		cover: 'https://res.cloudinary.com/snystrom/image/upload/v1717196384/gallery/red_k2egy3.jpg',
	},
	{
		title: 'Norway',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit.</> In vel eaque asperiores maiores perferendis eveniet.',
		cover:
			'https://res.cloudinary.com/snystrom/image/upload/v1717196383/gallery/preikestolen_f6xdrk.jpg',
	},
	{
		title: 'Adventure',
		description: 'string',
		cover: 'https://res.cloudinary.com/snystrom/image/upload/v1717196385/gallery/dad_qbgvgt.jpg',
	},
] as Array<GalleryCollection>;
