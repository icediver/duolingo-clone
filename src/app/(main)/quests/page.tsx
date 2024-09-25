import type { Metadata } from 'next';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import { FeedWrapper } from '@/components/ui/feed-wrapper/FeedWrapper';
import { Progress } from '@/components/ui/progress';
import { Promo } from '@/components/ui/promo/Promo';
import { StickyWrapper } from '@/components/ui/sticky-wraper/StickyWrapper';
import { UserProgress } from '@/components/ui/user-progress/UserProgress';

import { quests } from '@/constants/constants';
import { getUserProgress, getUserSubscription } from '@/db/queries';

export const metadata: Metadata = {
	title: 'Shop',
	description: '',
};

export default async function QuestsPage() {
	const userProgressData = getUserProgress();
	const userSubscriptionsData = getUserSubscription();

	const [userProgress, userSubscription] = await Promise.all([
		userProgressData,
		userSubscriptionsData,
	]);

	if (!userProgress || !userProgress.activeCourse) {
		redirect('/courses');
	}

	const isPro = !!userSubscription?.isActive;

	return (
		<div className="flex flex-row-reverse gap-[48px] px-6">
			<StickyWrapper>
				<UserProgress
					activeCourse={userProgress.activeCourse}
					hearts={userProgress.hearts}
					points={userProgress.points}
					hasActiveSubscription={isPro}
				/>
				{isPro && <Promo />}
			</StickyWrapper>
			<FeedWrapper>
				<div className="flex w-full flex-col items-center">
					<Image src="/quests.svg" alt="Quests" width={90} height={90} />
					<h1 className="my-6 text-center text-2xl font-bold text-neutral-800">
						Quests
					</h1>
					<p className="mb-6 text-center text-lg text-muted-foreground">
						Complete quests by earning points
					</p>
					<ul className="w-full">
						{quests.map((quest) => {
							const progress = (userProgress.points / quest.value) * 100;
							return (
								<li
									key={quest.title}
									className="flex w-full items-center gap-x-4 border-t-2 p-4"
								>
									<Image
										src="/points.svg"
										alt="Points"
										width={60}
										height={60}
									/>
									<div className="flex w-full flex-col gap-y-2">
										<p className="text-xl font-bold text-neutral-700">
											{quest.title}
										</p>
									</div>
									<Progress value={progress} className="h-3" />
								</li>
							);
						})}
					</ul>
				</div>
			</FeedWrapper>
		</div>
	);
}
