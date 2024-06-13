import { Router } from 'express';
import {
	createProduct,
	deleteProduct,
	getProductById,
	getProductByName,
	getProducts,
	updateProduct,
} from './handlers';
import { handlerErrorMiddleware } from './middleware';
import { createProductSchema, updateProductSchema } from './schemas';
import { param } from 'express-validator';

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
router.get('/', getProducts);
router.get(
	'/:id',
	param('id')
		.isInt()
		.custom((value) => value > 0)
		.withMessage("Id isn't valid"),
	handlerErrorMiddleware,
	getProductById
);
router.get('/:name', getProductByName);

router.post('/', createProductSchema, handlerErrorMiddleware, createProduct);
router.put('/:id', updateProductSchema, handlerErrorMiddleware, updateProduct);
router.delete('/:id', deleteProduct);

export default router;
