import Image from 'next/image';

import { Button } from '@/components/ui/button';

const languages = [
	{
		name: 'Croatian',
		src: '/hr.svg',
	},
	{
		name: 'French',
		src: '/fr.svg',
	},
	{
		name: 'Romanian',
		src: '/ro.svg',
	},
	{
		name: 'Spanish',
		src: '/es.svg',
	},
	{
		name: 'Italian',
		src: '/it.svg',
	},
];

export function Footer() {
	return (
		<footer className="hidden h-20 w-full border-t-2 border-slate-200 lg:block">
			<div className="mx-auto flex h-full max-w-screen-lg items-center justify-evenly">
				{languages.map((language) => (
					<Button
						size="lg"
						variant="ghost"
						className="w-full"
						key={language.name}
					>
						<Image
							src={language.src}
							alt={language.name}
							height="32"
							width="40"
							className="mr-4 rounded-md"
						/>
						{language.name}
					</Button>
				))}
			</div>
			footer
		</footer>
	);
}
