import { LessonButton } from './lesson-button/LessonButton';
import { UnitBanner } from './unit-banner/UnitBanner';
import { lessons, units } from '@/db/schema';

type Props = {
	id: number;
	order: number;
	title: string;
	description: string;
	lessons: (typeof lessons.$inferSelect & { completed: boolean })[];
	activeLesson:
		| (typeof lessons.$inferSelect & { unit: typeof units.$inferSelect })
		| undefined;
	activeLessonsPercentage: number;
};
export function Unit({
	id,
	order,
	title,
	description,
	lessons,
	activeLesson,
	activeLessonsPercentage,
}: Props) {
	return (
		<>
			<UnitBanner title={title} description={description} />
			<div className="relative flex flex-col items-center">
				{lessons.map((lesson, index) => {
					const isCurrent = lesson.id === activeLesson?.id;
					const isLocked = !lesson.completed && !isCurrent;

					return (
						<LessonButton
							key={lesson.id}
							id={lesson.id}
							totalCount={lessons.length - 1}
							index={index}
							locked={isLocked}
							current={isCurrent}
							percentage={activeLessonsPercentage}
						/>
					);
				})}
			</div>
		</>
	);
}
