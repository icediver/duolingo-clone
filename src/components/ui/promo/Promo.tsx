'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '../button';

export function Promo() {
	return (
		<div className="space-y-4 rounded-xl border-2 p-4">
			<div className="space-y-2">
				<div className="flex items-center gap-x-2">
					<Image src="/unlimited.svg" alt="Pro" width={26} height={26} />
					<p className="text-lg font-bold">Upgrade to Pro</p>
				</div>
				<p className="text-muted-foreground">Get unlimited hearts and more!</p>
			</div>

			<Button variant="super" size="lg" className="w-full">
				<Link href="/shop">Upgrade today</Link>
			</Button>
		</div>
	);
}
