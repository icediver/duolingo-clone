import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

import { isAdmin } from '@/lib/admin';

const App = dynamic(() => import('@/components/admin/app/App'), {
	ssr: false,
});

export const metadata: Metadata = {
	title: '',
	description: '',
};

export default function AdminPage() {
	if (!isAdmin()) redirect('/');

	return <App />;
}
