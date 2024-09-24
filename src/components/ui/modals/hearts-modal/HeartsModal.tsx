'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useHeartsModal } from '@/store/use-hearts-modal';

import { Button } from '../../button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '../../dialog';

export function HeartsModal() {
	const router = useRouter();
	const [isClient, setIsClient] = useState(false);
	const { isOpen, close } = useHeartsModal();

	useEffect(() => setIsClient(true), []);

	function onClick() {
		close();
		router.push('/store');
	}

	if (!isClient) return null;

	return (
		<Dialog open={isOpen} onOpenChange={close}>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<div className="mb-5 flex w-full items-center justify-center">
						<Image src="/mascot_bad.svg" alt="Mascot" height={80} width={80} />
					</div>
					<DialogTitle className="text-center text-2xl font-bold">
						You ran out of hearts!
					</DialogTitle>
					<DialogDescription className="text-center text-base">
						Get Pro unlimited hearts, or purshase more.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="mb-4">
					<div className="flex w-full flex-col gap-y-4">
						<Button
							variant="primary"
							className="w-full"
							size={'lg'}
							onClick={onClick}
						>
							Get unlimited hearts
						</Button>
						<Button
							variant="primaryOutline"
							className="w-full"
							size={'lg'}
							onClick={close}
						>
							No thanks
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
