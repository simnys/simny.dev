import Divider from '@/components/blog/Divider';
import CustomLink from '@/components/blog/Link';
import PageHeader from '@/components/layouts/PageHeader';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

import { RAINDROP_COLLECTION_ID } from '@/data/constants';
import { getArchivedNowEntries, getLatestNowEntry } from '@/lib/now';
import { getRaindropsByCollection } from '@/lib/raindrop';
import { formatDate } from '@/lib/utils';
import { MDXContent } from '@content-collections/mdx/react';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Now',
};

export default async function Now() {
	const bookmarks = await getRaindropsByCollection(RAINDROP_COLLECTION_ID, 6);
	const latestEntry = getLatestNowEntry();
	const archivedEntries = getArchivedNowEntries();

	return (
		<>
			<div>
				<PageHeader title="Now" />
				<p>
					A collection of what's currently on my mind, what I'm working on, and what I'm interested
					in. Inspired by <CustomLink href="https://sive.rs/now">Derek Sivers</CustomLink>.
				</p>
			</div>

			{latestEntry && (
				<article className="prose prose-p:first-of-type:mt-0 prose-h2:first-of-type:mt-0">
					<span className="block mb-2 font-mono uppercase text-foreground-tertiary">
						Last updated:{' '}
						<time dateTime={latestEntry.date.toISOString()}>
							{formatDate(latestEntry.date, true, true)}
						</time>
					</span>

					<MDXContent code={latestEntry.body} />
				</article>
			)}

			<section>
				<h2 className="text-lg mb-1">Recent favorites</h2>
				<p className="mb-6 text-foreground-secondary">
					A mixed goodie bag of recent bookmarks. It could be anything, really.
				</p>
				<div className="grid sm:grid-cols-2 gap-3">
					{bookmarks?.map((bookmark) => (
						<Button
							key={bookmark._id}
							asChild
							variant="secondary"
							className="items-start h-auto py-3 whitespace-normal"
						>
							<a
								href={bookmark.link}
								target="_blank"
								rel="noopener noreferrer"
								className="flex flex-col overflow-hidden"
							>
								<div className="max-w-full text-xs flex items-center gap-1 text-foreground-tertiary">
									<Icon name="link" className="size-4" />
									<span className="truncate">{bookmark.domain}</span>
								</div>
								<p className="text-foreground text-sm">{bookmark.title}</p>
								{bookmark.note && (
									<p className="text-sm text-foreground-tertiary">{bookmark.note}</p>
								)}
							</a>
						</Button>
					))}
				</div>
			</section>

			<Divider className="m-0 sm:m-0" />

			{archivedEntries.length > 0 && (
				<section>
					<h2 className="text-lg">Archive</h2>
					<article className="prose space-y-6 sm:space-y-8 divide-y divide-border">
						{archivedEntries.map((entry) => (
							<section key={entry.slug} className="flex flex-col sm:flex-row gap-x-6 sm:py-4">
								<div className="w-fit min-w-30">
									<time className="font-mono text-foreground-tertiary uppercase">
										{formatDate(entry.date, true)}
									</time>
								</div>
								<div>
									{entry.title && <h3 className="mt-1">{entry.title}</h3>}
									<MDXContent code={entry.body} />
								</div>
							</section>
						))}
					</article>
				</section>
			)}
		</>
	);
}
