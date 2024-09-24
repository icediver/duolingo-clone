'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import Confetti from 'react-confetti';
import { useAudio, useWindowSize } from 'react-use';
import { toast } from 'sonner';

import { Challenge } from '../challenge/Challenge';
import { QuestionBubble } from '../question-bubble/QuestionBubble';

import { LessonFooter } from './lesson-footer/LessonFooter';
import { LessonHeader } from './lesson-header/LessonHeader';
import { ResultCard } from './result-card/ResultCard';
import { upsertChallengeProgress } from '@/actions/challenge-progress';
import { reduceHearts } from '@/actions/user-progres';
import { challengeOptions, challenges } from '@/db/schema';

type Props = {
	initialPercentage: number;
	initialHearts: number;
	initialLessonId: number;
	initialLessonChallenges: (typeof challenges.$inferSelect & {
		completed: boolean;
		challengeOptions: (typeof challengeOptions.$inferSelect)[];
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
	const { width, height } = useWindowSize();
	console.log(width, height);

	const router = useRouter();

	const [finishAudio] = useAudio({
		src: '/finish.mp3',
		autoPlay: true,
	});
	const [correctAudio, _c, correctControls] = useAudio({ src: '/correct.wav' });
	const [inCorrectAudio, _i, inCorrectControls] = useAudio({
		src: '/incorrect.wav',
	});
	const [pending, startTransition] = useTransition();

	const [lessonId, setLessonId] = useState(initialLessonId);
	const [hearts, setHearts] = useState(initialHearts);
	const [percentage, setPercentage] = useState(initialPercentage);
	const [challenges] = useState(initialLessonChallenges);
	const [activeIndex, setActiveIndex] = useState(() => {
		const uncompletedIndex = challenges.findIndex(
			(challenge) => !challenge.completed
		);
		return uncompletedIndex === -1 ? 0 : uncompletedIndex;
	});

	const [selectedOption, setSelectedOption] = useState<number>();
	const [status, setStatus] = useState<'correct' | 'wrong' | 'none'>('none');

	const challenge = challenges[activeIndex];
	const options = challenge?.challengeOptions ?? [];
	challenges.map((challenge) => console.log(challenge.challengeOptions));

	const onNext = () => {
		setActiveIndex((current) => current + 1);
	};
	const onSelect = (id: number) => {
		if (status !== 'none') return;

		setSelectedOption(id);
	};

	const onContinue = () => {
		if (!selectedOption) return;
		if (status === 'wrong') {
			setStatus('none');
			setSelectedOption(undefined);
			return;
		}
		if (status === 'correct') {
			onNext();
			setStatus('none');
			setSelectedOption(undefined);
			return;
		}
		const correctOption = options.find((option) => option.correct);
		if (!correctOption) {
			return;
		}

		if (correctOption.id === selectedOption) {
			startTransition(() => {
				upsertChallengeProgress(challenge.id)
					.then((response) => {
						if (response?.error === 'hearts') {
							console.error('Missing hearts');
							return;
						}

						correctControls.play();
						setStatus('correct');
						setPercentage((prev) => prev + 100 / challenges.length);

						if (initialPercentage === 100) {
							setHearts((prev) => Math.min(prev + 1, 5));
						}
					})
					.catch(() => toast.error('Something went wrong. Please try again.'));
			});
		} else {
			startTransition(() => {
				reduceHearts(challenge.id)
					.then((response) => {
						if (response?.error === 'hearts') {
							console.error('Missing hearts');
							return;
						}

						inCorrectControls.play();
						setStatus('wrong');
						if (!response?.error) {
							setHearts((prev) => Math.max(prev - 1, 0));
						}
					})
					.catch(() => toast.error('Something went wrong. Please try again.'));
			});
		}
	};

	if (!challenge) {
		return (
			<>
				{finishAudio}
				<Confetti
					width={width}
					height={height}
					recycle={false}
					numberOfPieces={500}
					tweenDuration={100}
				/>
				<div
					className={
						'mx-auto flex h-full max-w-lg flex-col items-center justify-center gap-y-4 text-center lg:gap-y-8'
					}
				>
					<Image
						src={'/finish.svg'}
						width={100}
						height={100}
						alt="Finish"
						className={'hidden lg:block'}
					/>
					<Image
						src={'/finish.svg'}
						width={50}
						height={50}
						alt="Finish"
						className={'block lg:hidden'}
					/>
					<h1 className={'text-xl font-bold text-neutral-700 lg:text-3xl'}>
						Great job! <br />
						You have completed the lesson
					</h1>
					<div className="flex w-full items-center gap-x-4">
						<ResultCard variant="points" value={challenges.length * 10} />
						<ResultCard variant="hearts" value={hearts} />
					</div>
				</div>
				<LessonFooter
					lessonId={lessonId}
					onCheck={() => router.push('/learn')}
					status={'completed'}
				/>
			</>
		);
	}

	const title =
		challenge.type === 'ASSIST'
			? 'Select the correct meaning'
			: challenge.question;

	return (
		<>
			{inCorrectAudio}
			{correctAudio}
			<LessonHeader
				hearts={hearts}
				percentage={percentage}
				hasActiveSubscription={!!userSubscription?.isActive}
			/>
			<div className="flex-1">
				<div className="flex h-full items-center justify-center">
					<div className="flex w-full flex-col gap-y-12 px-6 lg:min-h-[350px] lg:w-[600px] lg:px-0">
						<h1 className="text-center text-lg font-bold text-neutral-700 lg:text-start lg:text-3xl">
							{title}
						</h1>
						<div>
							{challenge.type === 'ASSIST' && (
								<QuestionBubble question={challenge.question} />
							)}
							<Challenge
								options={options}
								onSelect={onSelect}
								status={status}
								selectedOption={selectedOption}
								disabled={pending}
								type={challenge.type}
							/>
						</div>
					</div>
				</div>
			</div>
			<LessonFooter
				disabled={pending || !selectedOption}
				status={status}
				onCheck={onContinue}
			/>
		</>
	);
}
