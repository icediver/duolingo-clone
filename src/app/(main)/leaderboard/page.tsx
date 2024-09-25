import type { Metadata } from 'next';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { FeedWrapper } from '@/components/ui/feed-wrapper/FeedWrapper';
import { Separator } from '@/components/ui/separator';
import { StickyWrapper } from '@/components/ui/sticky-wraper/StickyWrapper';
import { UserProgress } from '@/components/ui/user-progress/UserProgress';

import {
	getTopTenUser,
	getUserProgress,
	getUserSubscription,
} from '@/db/queries';

export const metadata: Metadata = {
	title: 'Shop',
	description: '',
};

export default async function LeaderBoardPage() {
	const userProgressData = getUserProgress();
	const userSubscriptionsData = getUserSubscription();
	const leaderboardData = getTopTenUser();

	const [userProgress, userSubscription, leaderboard] = await Promise.all([
		userProgressData,
		userSubscriptionsData,
		leaderboardData,
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
			</StickyWrapper>
			<FeedWrapper>
				<div className="flex w-full flex-col items-center">
					<Image
						src="/leaderboard.svg"
						alt="Leaderboard"
						width={90}
						height={90}
					/>
					<h1 className="my-6 text-center text-2xl font-bold text-neutral-800">
						Leaderboard
					</h1>
					<p className="mb-6 text-center text-lg text-muted-foreground">
						See where you stand among in the other learners in the community.
					</p>
					<Separator className="mb-4 h-0.5 rounded-full" />
					{leaderboard.map((userProgress, index) => (
						<div
							className="flex w-full items-center rounded-xl p-2 px-4 hover:bg-gray-200/50"
							key={userProgress.userId}
						>
							<p className="mr-4 font-bold text-lime-700">{index + 1}</p>
							<Avatar className="ml-3 mr-6 h-12 w-12 border bg-green-500">
								<AvatarImage
									src={userProgress.userImageSrc}
									className="object-cover"
								/>
							</Avatar>
							<p className="flex-1 font-bold text-neutral-800">
								{userProgress.userName}
							</p>
							<p className="text-muted-foreground">{userProgress.points} XP</p>
						</div>
					))}
				</div>
			</FeedWrapper>
		</div>
	);
}
