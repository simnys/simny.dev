import { GalleryCollectionType } from '@/lib/types/types';
import GalleryCard from '../ui/GalleryCard';

type Props = {
	content: GalleryCollectionType[];
	lazy?: boolean;
};

export default function CollectionGallery({ content, lazy }: Props) {
	return (
		<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
			{content.map((item, index) => (
				<GalleryCard key={item.title} item={item} priority={!lazy && index < 3} />
			))}
		</div>
	);
}
