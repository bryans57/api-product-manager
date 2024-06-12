import { Router } from 'express';
import { createProduct } from './handlers';
import { handlerErrorMiddleware } from './middleware';
import { createProductSchema } from './schemas';

const router = Router();

const test = {
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

// Routing
router.get('/', (req, res) => {
	res.send('Hello, world!');
});

router.post('/', createProductSchema, handlerErrorMiddleware, createProduct);

export default router;
