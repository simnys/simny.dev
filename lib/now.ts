import { allNowEntries, NowEntry } from 'content-collections';
import { cache } from 'react';

export const getNowEntries = cache(() => {
	const entries = allNowEntries.toSorted((a, b) => b.date.getTime() - a.date.getTime());
	return entries;
});

export const getLatestNowEntry = () => {
	const entries = getNowEntries();
	if (!entries.length) return null;
	return entries[0];
};

export const getArchivedNowEntries = () => {
	const entries = getNowEntries();
	return entries.slice(1); // All except the latest
};
