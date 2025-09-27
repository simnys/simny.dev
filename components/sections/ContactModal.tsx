'use client';

import { SITE_CONTACT } from '@/data/constants';
import { navItems } from '@/data/navigation';
import { IconCheck, IconCopy, IconEmail } from '@/data/icons';
import Copy from '../ui/Copy';

export default function ContactModal() {
	return (
		<div className="flex flex-col">
			<div className="pt-8 pb-6 px-6 sm:px-8">
				<h3 className="text-3xl mb-2">Get in touch</h3>
				<p className="text-foreground-secondary">
					Whether you have a question, want to collaborate, or just want to say hi, my inbox is
					always open.
				</p>
			</div>
			<div className="flex items-center w-full border-y">
				<div className="flex flex-col grow text-foreground border-r py-3 px-6 sm:px-8 text-[15px] bg-background">
					<div className="flex items-center gap-x-2 text-[13px] text-foreground-secondary">
						<IconEmail width={15} height={15} />
						Email
					</div>
					{SITE_CONTACT}
				</div>
				<Copy
					toCopy={SITE_CONTACT}
					successMessage={<IconCheck width={28} height={28} />}
					hiddenClassName="left-auto bottom-auto"
					variant="grow"
					className="relative h-full flex items-center justify-center px-6 bg-background text-foreground transition-colors hover:text-background hover:bg-foreground"
				>
					<IconCopy width={20} height={20} />
				</Copy>
			</div>
			<div className="mt-auto flex items-center justify-center gap-4 py-4 text-foreground-secondary">
				{navItems.socialLinks.map((link) => (
					<a
						key={link.name}
						href={link.path}
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-background hover:bg-foreground rounded-xl transition-colors p-2"
					>
						{link.icon ? <link.icon width={20} height={20} /> : null}
					</a>
				))}
			</div>
		</div>
	);
}
