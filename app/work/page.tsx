import PageHeader from '@/components/layouts/PageHeader';
import StructuredData from '@/components/seo/StructuredData';
import { SITE_NAME, SITE_URL } from '@/data/constants';

import { sideProjects, professionalProjects } from '@/data/projects';

import { Metadata } from 'next';
import { CollectionPage, WithContext } from 'schema-dts';
import { Card } from '@/components/ui/Card';

const title = 'Work';
const description = "Things I've worked on, built or tinkered with.";

export const metadata: Metadata = {
	title: title,
	description: description,
};

export default function Work() {
	const jsonLd: WithContext<CollectionPage> = {
		'@type': 'CollectionPage',
		'@context': 'https://schema.org',
		name: `${SITE_NAME} - ${title}`,
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
			<StructuredData id="work_jsonLd" data={jsonLd} />

			<PageHeader title={title} content={description} />

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
