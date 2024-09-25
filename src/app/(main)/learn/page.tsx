import { redirect } from 'next/navigation';

import { FeedWrapper } from '@/components/ui/feed-wrapper/FeedWrapper';
import { StickyWrapper } from '@/components/ui/sticky-wraper/StickyWrapper';
import { Unit } from '@/components/ui/unit/Unit';
import { UserProgress } from '@/components/ui/user-progress/UserProgress';

import { Header } from '@/app/(main)/learn/header';
import {
	getCourseProgress,
	getLessonPercentage,
	getUnits,
	getUserProgress,
	getUserSubscription,
} from '@/db/queries';
import { lessons, units as unitsSchema } from '@/db/schema';

export default async function LearnPage() {
	const userProgressData = getUserProgress();
	const courseProgressData = getCourseProgress();
	const lessonPercentageData = getLessonPercentage();
	const userSubscriptionData = getUserSubscription();

	const unitsData = getUnits();

	const [
		userProgress,
		courseProgress,
		lessonPercentage,
		units,
		userSubscription,
	] = await Promise.all([
		userProgressData,
		courseProgressData,
		lessonPercentageData,
		unitsData,
		userSubscriptionData,
	]);

	if (!userProgress || !userProgress.activeCourse) {
		redirect('/courses');
	}

	if (!courseProgress) {
		redirect('/courses');
	}

	return (
		<div className="flex flex-row-reverse gap-[48px] px-6">
			<StickyWrapper>
				<UserProgress
					activeCourse={userProgress.activeCourse}
					hearts={userProgress.hearts}
					points={userProgress.points}
					hasActiveSubscription={!!userSubscription?.isActive}
				/>
			</StickyWrapper>
			<FeedWrapper>
				<Header title={userProgress.activeCourse.title} />
				{units.map((unit) => (
					<div className="mb-10" key={unit.id}>
						<Unit
							id={unit.id}
							order={unit.order}
							description={unit.description}
							title={unit.title}
							lessons={unit.lessons}
							activeLesson={
								courseProgress.activeLesson as
									| (typeof lessons.$inferSelect & {
											unit: typeof unitsSchema.$inferSelect;
									  })
									| undefined
							}
							activeLessonsPercentage={lessonPercentage}
						/>
					</div>
				))}
			</FeedWrapper>
		</div>
	);
}
