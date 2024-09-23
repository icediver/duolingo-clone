import Image from 'next/image';

type Props = {
	question: string;
};
export function QuestionBubble({ question }: Props) {
	return (
		<div className="mb-6 flex items-center gap-x-4">
			<Image
				src="/mascot.svg"
				width={60}
				height={60}
				alt="Mascot"
				className="hidden lg:block"
			/>
			<Image
				src="/mascot.svg"
				width={40}
				height={40}
				alt="Mascot"
				className="block lg:hidden"
			/>
			<div className="lg:text:base relative rounded-xl border-2 px-4 py-2 text-sm">
				{question}
				<div className="absolute -left-3 top-1/2 h-0 w-0 -translate-y-1/2 rotate-90 transform border-x-8 border-t-8 border-x-transparent" />
			</div>
		</div>
	);
}
