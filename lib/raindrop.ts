'use server';

interface RaindropCollection {
	_id: number;
	title: string;
	description: string;
	count: number;
	lastUpdate: Date;
	slug: string;
	parent?: { $id: number };
	items?: Raindrop[];
}
interface Raindrop {
	_id: number;
	collectionId: number;
	title: string;
	domain: string;
	link: string;
	type: string;
	created: Date;
	note?: string;
	tags?: string[];
}

const mapRaindropCollections = (
	collections: RaindropCollection[],
	items: Raindrop[]
): RaindropCollection[] => {
	return collections.map((collection) => {
		return {
			...collection,
			items: items.filter((item) => item.collectionId === collection._id),
		};
	});
};

const getRaindropChildCollections = async (id: number): Promise<RaindropCollection[] | null> => {
	const accessToken = process.env.RAINDROP_ACCESS_TOKEN;

	const response = await fetch('https://api.raindrop.io/rest/v1/collections/childrens', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		console.error(`Raindrop API error: ${response.status} - ${response.statusText}`);
		return null;
	}

	const data = await response.json();

	if (!data.result) {
		console.error('Raindrop API returned error:', data.errorMessage);
		return null;
	}

	const collections = data.items.filter(
		(collection: any) => collection.parent && collection.parent.$id === id
	);

	return collections;
};

export const getRaindropsByCollection = async (
	id: number,
	limit?: number
): Promise<Raindrop[] | null> => {
	const accessToken = process.env.RAINDROP_ACCESS_TOKEN;

	const response = await fetch(
		`https://api.raindrop.io/rest/v1/raindrops/${id}?nested=true&perpage=${limit}`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			next: {
				revalidate: 60 * 60 * 24, // Cache for 1 day
			},
		}
	);

	if (!response.ok) {
		console.error(`Raindrop API error: ${response.status} - ${response.statusText}`);
		return null;
	}

	const data = await response.json();

	if (!data.result) {
		console.error('Raindrop API returned error:', data.errorMessage);
		return null;
	}

	return data.items;
};

export async function getRaindrops(id: number): Promise<RaindropCollection[] | null> {
	try {
		const raindrops = await getRaindropsByCollection(id);
		const collections = await getRaindropChildCollections(id);

		if (!raindrops || !collections) return null;

		return mapRaindropCollections(collections, raindrops);
	} catch (error) {
		console.error('Error fetching Raindrop collection:', error);
		return null;
	}
}
