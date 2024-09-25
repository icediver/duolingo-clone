import type { Metadata } from 'next';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import { FeedWrapper } from '@/components/ui/feed-wrapper/FeedWrapper';
import { Promo } from '@/components/ui/promo/Promo';
import { Quests } from '@/components/ui/quests/Promo';
import { ShopItems } from '@/components/ui/shop-items/ShopItems';
import { StickyWrapper } from '@/components/ui/sticky-wraper/StickyWrapper';
import { UserProgress } from '@/components/ui/user-progress/UserProgress';

import { getUserProgress, getUserSubscription } from '@/db/queries';

export const metadata: Metadata = {
	title: 'Shop',
	description: '',
};

export default async function ShopPage() {
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
				<Quests points={userProgress.points} />
			</StickyWrapper>
			<FeedWrapper>
				<div className="flex w-full flex-col items-center">
					<Image src="/shop.svg" alt="Shop" width={90} height={90} />
					<h1 className="my-6 text-center text-2xl font-bold text-neutral-800">
						Shop
					</h1>
					<p className="mb-6 text-center text-lg text-muted-foreground">
						Spend your points on cool stuff!
					</p>
					<ShopItems
						hearts={userProgress.hearts}
						points={userProgress.points}
						hasActiveSubscription={isPro}
					/>
				</div>
			</FeedWrapper>
		</div>
	);
}
