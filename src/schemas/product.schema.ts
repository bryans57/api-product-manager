import { Schema, checkSchema } from 'express-validator';

const basicProductSchema = {
	name: {
		in: ['body'],
		isString: {
			errorMessage: 'Name must be a string',
		},
		notEmpty: {
			errorMessage: 'Name is required',
		},
	},
	price: {
		in: ['body'],
		isFloat: {
			errorMessage: 'Price must be a valid number',
			options: { min: 0 },
		},
	},
};

export const createProductSchema = checkSchema(basicProductSchema as Schema);

export const updateProductSchema = checkSchema({
	...basicProductSchema,
	availability: {
		in: ['body'],
		isBoolean: {
			errorMessage: 'Availability must be a boolean',
		},
	},
} as Schema);
