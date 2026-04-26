import { SITE_URL } from '@/data/constants';
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);

		const title = searchParams.get('title') || 'Blog Post';
		const tags = searchParams.get('tags') || '';
		const imagePath = searchParams.get('image') || '';

		const tagList = tags
			.split(',')
			.map((tag) => tag.trim())
			.filter((tag) => tag.length > 0);

		const imageUrl = imagePath && `${SITE_URL}${imagePath}`;

		// Load local fonts
		const interFont = await readFile(path.join(process.cwd(), 'public/fonts/InterDisplay.ttf'));

		return new ImageResponse(
			<div tw="w-full h-full flex items-center relative">
				<img
					tw="absolute top-0 left-0 w-full h-full"
					src={`${SITE_URL}/images/og-base.jpg`}
					alt="Overlay"
				/>

				{imageUrl && (
					<img
						style={{
							objectFit: 'cover',
							objectPosition: 'center',
							border: '8px solid black',
							position: 'absolute',
							right: '72px',
							borderRadius: '2px',
						}}
						width={400}
						height={500}
						src={imageUrl}
						alt="Blog image"
					/>
				)}

				<span tw="absolute left-[40.5px] top-12 h-px w-4 bg-black" />
				<span tw="absolute left-[48px] top-[40.5px] h-4 w-px bg-black" />

				<span tw="absolute right-[40.5px] top-12 h-px w-4 bg-black" />
				<span tw="absolute right-[48px] top-[40.5px] h-4 w-px bg-black" />

				<span tw="absolute bottom-12 left-[40.5px] h-px w-4 bg-black" />
				<span tw="absolute bottom-[40.5px] left-[48px] h-4 w-px bg-black" />

				<span tw="absolute bottom-12 right-[40.5px] h-px w-4 bg-black" />
				<span tw="absolute bottom-[40.5px] right-[48px] h-4 w-px bg-black" />

				<span tw="absolute h-px w-full bg-black/30 top-12" />
				<span tw="absolute h-px w-full bg-black/30 bottom-12" />
				<span tw="absolute h-full w-px bg-black/30 left-12" />
				<span tw="absolute h-full w-px bg-black/30 right-12" />

				<div tw="absolute left-20 bottom-20 w-1/2 h-full flex flex-col justify-end">
					<h1 style={{ fontFamily: 'Inter' }} tw="w-full text-black text-7xl text-balance">
						{title}
					</h1>
					<div style={{ fontFamily: 'Inter' }} tw="uppercase flex items-center">
						{tagList.map((tag, index) => (
							<span
								key={index}
								tw="px-6 py-2 mr-5 text-black text-sm tracking-wide bg-black/10 rounded-lg"
							>
								# {tag}
							</span>
						))}
					</div>
				</div>
			</div>,
			{
				width: 1200,
				height: 630,
				fonts: [
					{
						name: 'Inter',
						data: interFont,
						style: 'normal',
					},
				],
			},
		);
	} catch (error) {
		console.error('Error generating OG image:', error);
		return new Response('Failed to generate OG image', { status: 500 });
	}
}
