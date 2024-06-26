import express from 'express';
import colors from 'colors';
import router from './router';
import db from './config/db';

async function startDBConnection() {
	try {
		await db.authenticate();
		db.sync();
		//console.info(colors.blue('Connected to the database'));
	} catch (error) {
		console.error(error);
		console.error(colors.red.bold('Failed to connect to the database'));
	}
}

const server = express();

startDBConnection();
server.use(express.json());
server.use('/api/products', router);
server.get('/api', (req, res) => {
	res.json({ message: 'API is working' });
});

export default server;
