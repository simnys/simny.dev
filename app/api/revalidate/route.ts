import { GALLERY_COLLECTIONS_TAG_PREFIX } from '@/data/gallery';
import { galleryCollections } from '@/data/gallery';
import { slugify } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

function mapPaths(resources: any[]): string[] {
	const paths: string[] = [];
	paths.push('/gallery');

	for (const resource of resources) {
		const match = galleryCollections.find((c) => {
			return (
				(resource.added &&
					resource.added.includes(`${GALLERY_COLLECTIONS_TAG_PREFIX}${slugify(c.title)}`)) ||
				(resource.removed &&
					resource.removed.includes(`${GALLERY_COLLECTIONS_TAG_PREFIX}${slugify(c.title)}`))
			);
		});

		if (match) {
			paths.push(`/gallery/${slugify(match.title)}`);
		}
	}

	return paths;
}

export async function POST(req: NextRequest) {
	// Check for secret to confirm this is a valid request
	if ((req.nextUrl.searchParams.get('secret') as string) !== process.env.REVALIDATION_SECRET) {
		return NextResponse.json({ error: 'Invalid token', status: 401 });
	}

	try {
		const body = await req.json();
		const resources = body.resources || [];

		const pathsToRevalidate = mapPaths(resources);
		await Promise.all(pathsToRevalidate.map((path) => revalidatePath(path)));

		return NextResponse.json({ revalidated: true, paths: pathsToRevalidate });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ error: 'Error revalidating', status: 500 });
	}
}
