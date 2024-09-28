import { auth } from '@clerk/nextjs/server';

const adminIds = ['user_2mIwmvrvaaqmR6zQpJl4M16xlHY'];

export const isAdmin = () => {
	const { userId } = auth();
	if (!userId) return false;

	return adminIds.indexOf(userId) !== -1;
};
