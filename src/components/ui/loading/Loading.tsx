import { Loader } from 'lucide-react';

export function Loading() {
	return (
		<div className="flex h-full w-full items-center justify-center">
			<Loader className="animate-spin text-muted-foreground" />
		</div>
	);
}
