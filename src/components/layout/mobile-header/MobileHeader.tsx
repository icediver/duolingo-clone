import { MobileSidebar } from '../mobile-sidebar/MobileSidebar';

export function MobileHeader() {
	return (
		<nav
			className={
				'fixed top-0 z-50 flex h-[50px] w-full items-center border-b bg-yellow-500 px-6 lg:hidden'
			}
		>
			<MobileSidebar />
		</nav>
	);
}
