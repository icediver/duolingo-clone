import type { Metadata } from 'next';

import { CoursesList } from '@/components/ui/courses-list/CoursesList';

import { getCourses, getUserProgress } from '@/db/queries';

export const metadata: Metadata = {
	title: 'Courses',
	description: '',
};

export default async function Page() {
	const coursesData = getCourses();
	const userProgressData = getUserProgress();
	const [courses, userProgress] = await Promise.all([
		coursesData,
		userProgressData,
	]);
	return (
		<div className="mx-auto h-full max-w-[912px] px-3">
			<h1 className="text-2xl font-bold text-neutral-700">Language Courses</h1>
			<CoursesList
				courses={courses}
				activeCourseId={userProgress?.activeCourseId}
			/>
		</div>
	);
}
