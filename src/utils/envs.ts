import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
	PORT: process.env.PORT ?? 4000,
	DB_URI_CONNECTION: process.env.DB_URI_CONNECTION ?? '',
};
