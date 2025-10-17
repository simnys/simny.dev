import PageHeader from '@/components/layouts/PageHeader';
import { Section, SectionHeader } from '@/components/layouts/Section';
import { Card, CardBody, CardFooter } from '@/components/ui/Card';
import CardOverlay from '@/components/ui/CardOverlay';
import { Icon } from '@/components/ui/Icon';
import { SITE_NAME, SITE_URL } from '@/data/constants';
import Sr from '@/public/icons/sr.svg';

import { sideProjects, professionalProjects } from '@/data/projects';
import { cn } from '@/lib/utils';

import { Metadata } from 'next';
import Script from 'next/script';
import { CollectionPage, WithContext } from 'schema-dts';
import Image from 'next/image';
import { Project } from '@/lib/types/types';
import Link from 'next/link';

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
						<ProjectCard key={project.title} project={project} />
					))}
				</div>
			</section>

			<section>
				<h2 className="mb-4">Side projects</h2>
				<div className="grid md:grid-cols-2 gap-6">
					{sideProjects.map((project) => (
						<ProjectCard key={project.title} project={project} />
					))}
				</div>
			</section>
		</>
	);
}

const ProjectCard = ({ project }: { project: Project }) => {
	return (
		<a
			href={project.link}
			target="_blank"
			rel="noopener noreferrer"
			className={cn(
				'relative w-full h-[240px] bg-background-secondary p-4 rounded-xl border border-border shadow-xs flex flex-col',
				'group transition-colors duration-200 ease-out hover:bg-background dark:hover:bg-background-tertiary'
			)}
		>
			<div className="grow flex items-center justify-center mt-6">
				<Icon name={project.icon ?? 'code'} className="size-9" />
			</div>
			<div className="space-y-0.5">
				{project.date && (
					<time className="inline-block font-mono uppercase text-foreground-tertiary text-[12px]">
						{project.date}
					</time>
				)}
				<h3>{project.title}</h3>
				<p className="text-sm text-foreground-tertiary line-clamp-2 leading-relaxed">
					{project.description}
				</p>
			</div>
		</a>
	);
};
