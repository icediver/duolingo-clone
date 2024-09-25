import Image from 'next/image';
import Link from 'next/link';

import { Button } from '../button';
import { Progress } from '../progress';

import { quests } from '@/constants/constants';

type Props = {
	points: number;
};

export function Quests({ points }: Props) {
	return (
		<div className="space-y-4 rounded-xl border-2 p-4">
			<div className="flex w-full items-center justify-between space-y-2">
				<p className="text-lg font-bold">Quests</p>

				<Button variant="primaryOutline" size="lg" className="w-full">
					<Link href="/href">View all</Link>
				</Button>
			</div>
			<ul className="w-full space-y-2">
				{quests.map((quest) => {
					const progress = (points / quest.value) * 100;
					return (
						<li
							key={quest.title}
							className="flex w-full items-center gap-x-3 pb-4"
						>
							<div className="flex items-center space-x-2">
								<Image
									src={'/points.svg'}
									alt={'Points'}
									width={40}
									height={40}
								/>
								<div className="flex w-full flex-col gap-y-2">
									<p className="text-sm font-bold text-neutral-700">
										{quest.title}
									</p>
									<Progress value={progress} className="h-2" />
								</div>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
