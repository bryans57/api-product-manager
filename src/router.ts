import { Router } from 'express';
import {
	createProduct,
	deleteProduct,
	getProductById,
	getProductByName,
	getProducts,
	updateAvailable,
	updateProduct,
} from './handlers';
import { handlerErrorMiddleware } from './middleware';
import {
	checkIdParamSchema,
	createProductSchema,
	updateProductSchema,
} from './schemas';
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
router.get('/:id', checkIdParamSchema, handlerErrorMiddleware, getProductById);
router.get('/:name', getProductByName);

router.post('/', createProductSchema, handlerErrorMiddleware, createProduct);

router.put('/:id', updateProductSchema, handlerErrorMiddleware, updateProduct);
router.patch(
	'/:id',
	checkIdParamSchema,
	handlerErrorMiddleware,
	updateAvailable
);

router.delete(
	'/:id',
	checkIdParamSchema,
	handlerErrorMiddleware,
	deleteProduct
);

export default router;
