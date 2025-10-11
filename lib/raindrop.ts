'use server';

interface Raindrop {
	title: string;
	domain: string;
	link: string;
	type: string;
	created: Date;
	note?: string;
	tags?: string[];
}

interface RaindropApiResponse {
	result: boolean;
	count: number;
	items: Raindrop[];
}

interface RaindropApiError {
	result: boolean;
	error: string;
	errorMessage: string;
}

/**
 * Fetches bookmarks from a Raindrop.io collection by ID
 * @param id - The collection ID to fetch
 * @returns Promise with the collection data or null if not found/error
 */
export async function getRaindropCollection(id: string): Promise<Raindrop[] | null> {
	try {
		const accessToken = process.env.RAINDROP_ACCESS_TOKEN;

		if (!accessToken) {
			console.error('RAINDROP_ACCESS_TOKEN environment variable is not set');
			return null;
		}

		const response = await fetch(`https://api.raindrop.io/rest/v1/raindrops/${id}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			// Add cache settings for Next.js
			next: {
				revalidate: 60 * 60 * 24, // Cache for 1 day
			},
		});

		if (!response.ok) {
			console.error(`Raindrop API error: ${response.status} - ${response.statusText}`);
			return null;
		}

		const data: RaindropApiResponse | RaindropApiError = await response.json();

		console.log(data);

		if (!data.result) {
			console.error('Raindrop API returned error:', (data as RaindropApiError).errorMessage);
			return null;
		}

		return (data as RaindropApiResponse).items;
	} catch (error) {
		console.error('Error fetching Raindrop collection:', error);
		return null;
	}
}
