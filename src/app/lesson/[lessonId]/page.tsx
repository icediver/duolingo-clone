import { get } from 'http';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Quiz } from '@/components/ui/quiz/Quiz';

import { getLesson, getUserProgress, getUserSubscription } from '@/db/queries';

export const metadata: Metadata = {
	title: '',
	description: '',
};

type Props = {
	params: {
		lessonId: number;
	};
};

export default async function LessonIdPage({ params }: Props) {
	const lessonData = getLesson(params.lessonId);
	const userProgressData = getUserProgress();
	const userSubscriptionData = getUserSubscription();

	const [lesson, userProgress, userSubscription] = await Promise.all([
		lessonData,
		userProgressData,
		userSubscriptionData,
	]);

	if (!lesson || !userProgress) {
		redirect('/learn');
	}
	const initialPercentage =
		(lesson.challenges.filter((challenge) => challenge.completed).length /
			lesson.challenges.length) *
		100;

	return (
		<Quiz
			initialPercentage={initialPercentage}
			initialLessonChallenges={lesson.challenges}
			initialHearts={userProgress.hearts}
			initialLessonId={lesson.id}
			userSubscription={userSubscription}
		/>
	);
}
