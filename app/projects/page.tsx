import PageHeader from '@/components/layouts/PageHeader';
import { Section } from '@/components/layouts/Section';
import { Card, CardBody, CardFooter } from '@/components/ui/Card';
import { SITE_NAME, SITE_URL } from '@/data/constants';

import { projectsData } from '@/data/data';
import { IconCode, IconGithub } from '@/data/icons';

import { Metadata } from 'next';
import Script from 'next/script';
import { CollectionPage, WithContext } from 'schema-dts';

export const metadata: Metadata = {
	title: 'Projects',
	description: "Some of the things I've built, tinkered with, or just enjoyed working on.",
};

export default function Projects() {
	const jsonLd: WithContext<CollectionPage> = {
		'@type': 'CollectionPage',
		'@context': 'https://schema.org',
		name: `${SITE_NAME} Projects`,
		description: metadata.description || '',
		url: `${SITE_URL}/projects`,
		mainEntity: {
			'@type': 'ItemList',
			itemListElement: projectsData.map((project) => ({
				'@type': 'SoftwareSourceCode',
				name: project.title,
				description: project.description,
				codeRepository: project.githubLink,
				image: `${SITE_URL}/${project.image}`,
			})),
		},
	};

	return (
		<main className="grow">
			<Script
				type="application/ld+json"
				id="projects_jsonLd"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>

			<PageHeader
				title="Projects"
				content="Some of the things I've built, tinkered with, or just enjoyed working on."
				subtitle={{ text: 'Dev', Icon: IconCode }}
			/>

			<Section className="grid md:grid-cols-2 gap-4 px-2 pt-2">
				{projectsData.map((project, idx) => (
					<Card
						key={project.title}
						href={project.githubLink ?? ''}
						image={project.image}
						imageMeta={{ blur: '', width: 512, height: 300 }}
						className="h-[250px]"
					>
						<CardBody title={project.title} icon={IconGithub}>
							{project.description}
						</CardBody>
						<CardFooter>
							{project.stack.map((item) => (
								<span key={item}>{item}</span>
							))}
						</CardFooter>
					</Card>
				))}
			</Section>
		</main>
	);
}
