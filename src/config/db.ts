import { Sequelize } from 'sequelize';
import { ENV } from '../utils';

const db = new Sequelize(ENV.DB_URI_CONNECTION, {
	dialectOptions: {
		ssl: {
			require: false,
		},
	},
});

export default db;
