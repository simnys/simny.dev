import Divider from '@/components/blog/Divider';
import CustomLink from '@/components/blog/Link';
import PageHeader from '@/components/layouts/PageHeader';

import { getArchivedNowEntries, getLatestNowEntry } from '@/lib/now';
import { formatDate } from '@/lib/utils';
import { MDXContent } from '@content-collections/mdx/react';
import { Metadata } from 'next';

const title = 'Now';
const description = "What's currently on my mind, what I'm working on, and what I'm into.";

export const metadata: Metadata = {
	title: title,
	description: description,
};

export default async function Now() {
	const latestEntry = getLatestNowEntry();
	const archivedEntries = getArchivedNowEntries();

	return (
		<>
			<div>
				<PageHeader title={title} />
				<p className="mt-1 text-foreground-secondary">
					{`A collection of what's currently on my mind, what I'm working on, and what I'm interested
					in. Inspired by `}
					<CustomLink href="https://sive.rs/now">Derek Sivers</CustomLink>.
				</p>
			</div>

			{latestEntry && (
				<article className="mx-auto prose prose-p:first-of-type:mt-0 prose-h2:first-of-type:mt-0">
					<span className="block mb-2 font-serif text-foreground-tertiary">
						Last updated:{' '}
						<time dateTime={latestEntry.date.toISOString()}>
							{formatDate(latestEntry.date, true)}
						</time>
					</span>

					<MDXContent code={latestEntry.content} />
				</article>
			)}

			<Divider className="m-0 sm:m-0" />

			{archivedEntries.length > 0 && (
				<section className="max-w-[65ch] w-full mx-auto">
					<h2>Archive</h2>
					<article className="prose space-y-6 sm:space-y-8 divide-y divide-border">
						{archivedEntries.map((entry) => (
							<section key={entry.slug} className="flex flex-col sm:flex-row gap-x-6 sm:py-4">
								<div className="w-fit min-w-30">
									<time className="font-serif text-base text-foreground-tertiary">
										{formatDate(entry.date, true)}
									</time>
								</div>
								<div>
									{entry.title && <h3 className="mt-1">{entry.title}</h3>}
									<MDXContent code={entry.content} />
								</div>
							</section>
						))}
					</article>
				</section>
			)}
		</>
	);
}
