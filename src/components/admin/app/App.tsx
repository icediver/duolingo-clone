'use client';

import simpleRestProvider from 'ra-data-simple-rest';
import { Admin, Resource } from 'react-admin';

import { CourseList } from '@/components/admin/course/course-list/CourseList';

import { ChallengeList } from '../challenge/challenge-list/ChallengeList';
import { CreateChallenge } from '../challenge/create-challenge/CreateChallenge';
import { UpdateChallenge } from '../challenge/update-challenge/UpdateChallenge';
import { ChallengeOptionList } from '../challengeOption/challengeOption-list/ChallengeOptionList';
import { CreateChallengeOption } from '../challengeOption/create-challengeOption/CreateChallengeOption';
import { UpdateChallengeOption } from '../challengeOption/update-challengeOption/UpdateChallengeOption';
import { CreateCourse } from '../course/create-course/CreateCourse';
import { UpdateCourse } from '../course/update-course/UpdateCourse';
import { CreateLesson } from '../lessons/create-lesson/CreateUnit';
import { LessonList } from '../lessons/lesson-list/LessonList';
import { UpdateLesson } from '../lessons/update-lesson/UpdateLesson';
import { CreateUnit } from '../unit/create-unit/CreateUnit';
import { UnitList } from '../unit/unit-list/UnitList';
import { UpdateUnit } from '../unit/update-unit/UpdateUnit';

const dataProvider = simpleRestProvider('/api');

export default function App() {
	return (
		<Admin dataProvider={dataProvider}>
			<Resource
				name="courses"
				recordRepresentation={'title'}
				list={CourseList}
				create={CreateCourse}
				edit={UpdateCourse}
			/>
			<Resource
				name="units"
				recordRepresentation={'title'}
				list={UnitList}
				create={CreateUnit}
				edit={UpdateUnit}
			/>
			<Resource
				name="lessons"
				recordRepresentation={'title'}
				list={LessonList}
				create={CreateLesson}
				edit={UpdateLesson}
			/>
			<Resource
				name="challenges"
				recordRepresentation={'question'}
				list={ChallengeList}
				create={CreateChallenge}
				edit={UpdateChallenge}
			/>
			<Resource
				name="challengeOptions"
				recordRepresentation={'text'}
				list={ChallengeOptionList}
				create={CreateChallengeOption}
				edit={UpdateChallengeOption}
				options={{ label: 'Challenge Options' }}
			/>
		</Admin>
	);
}
