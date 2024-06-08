import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
	DB_URI_CONNECTION: process.env.DB_URI_CONNECTION ?? '',
};
