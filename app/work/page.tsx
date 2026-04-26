import PageHeader from '@/components/layouts/PageHeader';
import { Icon } from '@/components/ui/Icon';
import { SITE_NAME, SITE_URL } from '@/data/constants';

import { sideProjects, professionalProjects } from '@/data/projects';
import { cn } from '@/lib/utils';

import { Metadata } from 'next';
import Script from 'next/script';
import { CollectionPage, WithContext } from 'schema-dts';
import { IconName } from '@/lib/types/icons';
import { Card } from '@/components/ui/Card';

export const metadata: Metadata = {
	title: 'Work',
	description: "Some of the things I've built, tinkered with, or just enjoyed working on.",
};

export default function Work() {
	const jsonLd: WithContext<CollectionPage> = {
		'@type': 'CollectionPage',
		'@context': 'https://schema.org',
		name: `${SITE_NAME} Work`,
		description: metadata.description || '',
		url: `${SITE_URL}/work`,
		mainEntity: {
			'@type': 'ItemList',
			itemListElement: sideProjects.map((project) => ({
				'@type': 'SoftwareSourceCode',
				name: project.title,
				description: project.description,
				codeRepository: project.repoLink || project.link,
				image: `${SITE_URL}/${project.image}`,
			})),
		},
	};

	return (
		<>
			<Script
				type="application/ld+json"
				id="work_jsonLd"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>

			<PageHeader
				title="Work"
				content="Some of the things I've built, tinkered with, or just enjoyed working on."
			/>

			<section>
				<h2 className="mb-4">Professional work</h2>
				<div className="grid md:grid-cols-2 gap-6">
					{professionalProjects.map((project) => (
						<Card
							key={project.title}
							item={{ ...project, body: project.description, subtitle: project.date }}
						/>
					))}
				</div>
			</section>

			<section>
				<h2 className="mb-4">Side projects</h2>
				<div className="grid md:grid-cols-2 gap-6">
					{sideProjects.map((project) => (
						<Card
							key={project.title}
							item={{ ...project, body: project.description, subtitle: project.date }}
						/>
					))}
				</div>
			</section>
		</>
	);
}
