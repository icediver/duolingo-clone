'use client';

import Image from 'next/image';
import { useTransition } from 'react';
import { toast } from 'sonner';

import { Button } from '../button';

import { refillHearts } from '@/actions/user-progres';

export const POINTS_TO_REFILL = 10;

type Props = {
	hearts: number;
	points: number;
	hasActiveSubscription: boolean;
};
export function ShopItems({ hearts, points, hasActiveSubscription }: Props) {
	const [pending, startTransition] = useTransition();

	function onRefillHearts() {
		if (pending || hearts === 5 || points < POINTS_TO_REFILL) return;
		startTransition(() => {
			refillHearts().catch(() => {
				toast.error('Something went wrong');
			});
		});
	}

	return (
		<ul>
			<div className="flex w-full items-center gap-x-4 border-t-2 p-4">
				<Image src="/heart.svg" alt="Hearts" width={60} height={60} />
				<div className="flex-1">
					<p className="text-base font-bold text-neutral-700 lg:text-xl">
						Refil hearts
					</p>
				</div>
				<Button
					disabled={
						false // || pending || hearts === 5 || points < POINTS_TO_REFILL
					}
					onClick={onRefillHearts}
				>
					{hearts === 5 ? (
						'full'
					) : (
						<div className="flex items-center">
							<Image src="/points.svg" alt="Points" width={20} height={20} />
							<p>{POINTS_TO_REFILL}</p>
						</div>
					)}
				</Button>
			</div>
		</ul>
	);
}
