import { exit } from 'node:process';
import db from '../config/db';

const clearDB = async () => {
	try {
		await db.sync({ force: true });
		exit();
	} catch (error) {
		console.error(error);
		exit(1);
	}
};

if (process.argv[2] === '--clear') {
	clearDB();
}
