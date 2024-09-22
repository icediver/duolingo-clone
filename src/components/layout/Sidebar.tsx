import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { SidebarItem } from '../ui/sidebar-item/SidebarItem';

import { cn } from '@/lib/utils';

type Props = {
	className?: string;
};

const sidebarData = [
	{
		label: 'Learn',
		href: '/learn',
		iconSrc: '/learn.svg',
	},
	{
		label: 'Leaderboard',
		href: '/leaderboard',
		iconSrc: '/leaderboard.svg',
	},
	{
		label: 'quests',
		href: '/quests',
		iconSrc: '/quests.svg',
	},
	{
		label: 'shop',
		href: '/shop',
		iconSrc: '/shop.svg',
	},
];

export function Sidebar({ className }: Props) {
	return (
		<div
			className={cn(
				'left-0 top-0 flex h-full flex-col border-r-2 px-4 lg:fixed lg:w-[256px]',
				className
			)}
		>
			<Link href="/learn">
				<div className="flex items-center gap-x-3 pb-7 pl-4 pt-8">
					<Image src="/mascot.svg" height={40} width={40} alt="Mascot" />
					<h1 className="tracking-white text-2xl font-extrabold text-green-600">
						Lingo
					</h1>
				</div>
			</Link>
			<div className="flex flex-1 flex-col gap-y-2">
				{sidebarData.map((item) => (
					<SidebarItem
						label={item.label}
						href={item.href}
						iconSrc={item.iconSrc}
						key={item.label}
					/>
				))}
			</div>
			<div className="p-4">
				<ClerkLoading>
					<Loader className="h-5 w-5 animate-spin text-muted-foreground" />
				</ClerkLoading>
				<ClerkLoaded>
					<UserButton />
				</ClerkLoaded>
			</div>
		</div>
	);
}
