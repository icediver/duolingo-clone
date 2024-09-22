'use client';

import { useState } from 'react';

import { LessonHeader } from './lesson-header/LessonHeader';
import { challengeOptions, challenges } from '@/db/schema';

type Props = {
	initialPercentage: number;
	initialHearts: number;
	initialLessonId: number;
	initialLessonChallenges: (typeof challenges.$inferSelect & {
		copmleted: boolean;
		chalengeOptions: (typeof challengeOptions.$inferSelect)[];
	})[];
	userSubscription: any; //TODO: Replace with subscription DB type
};
export function Quiz({
	initialPercentage,
	initialHearts,
	initialLessonId,
	initialLessonChallenges,
	userSubscription,
}: Props) {
	const [hearts, setHearts] = useState(initialHearts);
	const [percentage, setPercentage] = useState(initialPercentage);

	return (
		<>
			<LessonHeader
				hearts={hearts}
				percentage={percentage}
				hasActiveSubscription={!!userSubscription?.isActive}
			/>
		</>
	);
}
