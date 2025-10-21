'use server';

export interface CommitInfo {
	sha: string;
	url: string;
}

/**
 * Fetch the latest commit from the GitHub API
 */
export async function getLatestCommit(): Promise<CommitInfo | null> {
	const owner = 'simnys';
	const repo = 'simny.dev';

	try {
		const response = await fetch(
			`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`,
			{
				headers: {
					Accept: 'application/vnd.github.v3+json',
					'User-Agent': 'simny.dev',
				},
			}
		);

		if (!response.ok) {
			console.warn(`Failed to fetch latest commit: ${response.statusText}`);
			return null;
		}

		const commit = await response.json();

		return {
			sha: commit[0].sha,
			url: commit[0].html_url,
		};
	} catch (error) {
		console.warn('Error fetching latest commit:', error);
		return null;
	}
}
