import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from '../schema';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
	try {
		console.log('Seeding database...');
		await db.delete(schema.courses);
		await db.delete(schema.userProgress);

		await db.insert(schema.courses).values([
			{
				title: 'Croatian',
				imageSrc: '/hr.svg',
			},
			{
				title: 'French',
				imageSrc: '/fr.svg',
			},
			{
				title: 'Romanian',
				imageSrc: '/ro.svg',
			},
			{
				title: 'Spanish',
				imageSrc: '/es.svg',
			},
			{
				title: 'Italian',
				imageSrc: '/it.svg',
			},
		]);
		//await db.insert(schema.userProgress).values(userProgress);

		console.log('Seeding database complete');
	} catch (error) {
		console.error(error);
		throw new Error('Failed to seed database');
	}
};

main();
