import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Quiz } from '@/components/ui/quiz/Quiz';

import { getLesson, getUserProgress } from '@/db/queries';

export const metadata: Metadata = {
	title: 'lesson',
	description: '',
};

export default async function LessonPage() {
	const lessonData = getLesson();
	const userProgressData = getUserProgress();

	const [lesson, userProgress] = await Promise.all([
		lessonData,
		userProgressData,
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
			initialLessonId={lesson.id}
			initialLessonChallenges={lesson.challenges}
			initialHearts={userProgress.hearts}
			initialPercentage={initialPercentage}
			userSubscription={null}
		/>
	);
}
