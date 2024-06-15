import { Sequelize } from 'sequelize-typescript';
import { ENV } from '../utils';

const basicConfig = {
	models: [__dirname + '/../models/**/*.model.ts'],
	dialectOptions: {
		ssl: {
			require: false,
		},
	},
};

if (ENV.IS_JEST_TESTING) {
	basicConfig['logging'] = false;
}

const db = new Sequelize(ENV.DB_URI_CONNECTION, basicConfig);

export default db;
