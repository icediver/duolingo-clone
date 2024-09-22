import { NotebookText } from 'lucide-react';
import Link from 'next/link';

import { Button } from '../../button';

type Props = {
	title: string;
	description: string;
};
export function UnitBanner({ title, description }: Props) {
	return (
		<div className="flex w-full items-center justify-between rounded-xl bg-green-500 p-5 text-white">
			<div className="5 space-y-2">
				<h3 className="text-2xl font-bold">{title}</h3>
				<p className="text-lg">{description}</p>
			</div>
			<Link href="/lesson">
				<Button
					size="lg"
					variant="secondary"
					className="hidden border-2 border-b-4 active:border-b-2 xl:flex"
				>
					<NotebookText className="mr-2" />
					Continue
				</Button>
			</Link>
		</div>
	);
}
