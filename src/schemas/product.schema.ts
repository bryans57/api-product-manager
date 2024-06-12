import { checkSchema } from 'express-validator';

export const createProductSchema = checkSchema({
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
});
