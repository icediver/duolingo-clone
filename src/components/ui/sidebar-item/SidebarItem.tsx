'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '../button';

interface ISidebarItem {
	label: string;
	iconSrc: string;
	href: string;
}

export function SidebarItem({ label, iconSrc, href }: ISidebarItem) {
	const pathname = usePathname();
	const active = pathname === href;
	return (
		<Button
			variant={active ? 'sidebarOutline' : 'sidebar'}
			className="h-[52px] justify-start"
		>
			<Image
				src={iconSrc}
				alt={label}
				className="mr5"
				height={32}
				width={32}
			></Image>
			<Link href={href}>{label}</Link>
		</Button>
	);
}
