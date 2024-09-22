'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

import { CourseCard } from './courses-card/CourseCard';
import { upserUserProgress } from '@/actions/user-progres';
import { courses, userProgress } from '@/db/schema';

type Props = {
	courses: (typeof courses.$inferSelect)[];
	activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};

export function CoursesList({ courses, activeCourseId }: Props) {
	const router = useRouter();
	const [pending, startTransition] = useTransition();

	const onClick = (id: number) => {
		if (pending) return;
		if (id === activeCourseId) return router.push('/learn');
		startTransition(() => {
			upserUserProgress(id).catch(() => {
				toast.error('Something went wrong.');
			});
		});
	};

	return (
		<div className="grid grid-cols-2 gap-4 pt-6 lg:grid-cols-[repeat(auto-fill,_minmax(210px,_1fr))]">
			{courses.map((course) => (
				<CourseCard
					key={course.id}
					id={course.id}
					title={course.title}
					imageSrc={course.imageSrc}
					onClick={onClick}
					disabled={pending}
					active={course.id === activeCourseId}
				/>
			))}
		</div>
	);
}
