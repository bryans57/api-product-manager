import { Sequelize } from 'sequelize-typescript';
import { ENV } from '../utils';

const db = new Sequelize(ENV.DB_URI_CONNECTION, {
	models: [__dirname + '/../models/**/*.model.ts'],
	dialectOptions: {
		ssl: {
			require: false,
		},
	},
});

export default db;
