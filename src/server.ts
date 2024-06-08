import express from 'express';
import router from './router';
import db from './config/db';

async function startDBConnection() {
	try {
		await db.authenticate();
		db.sync();
		console.info('Connected to the database');
	} catch (error) {
		console.error(error);
		console.error('Failed to connect to the database');
	}
}

const server = express();

startDBConnection();
server.use(router);

export default server;
