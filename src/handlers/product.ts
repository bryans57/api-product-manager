import { Request, Response } from 'express';
import Product from '../models/Product.model';

export const createProduct = async (req: Request, res: Response) => {
	try {
		const savedProduct = await Product.create(req.body);
		res.json({ message: 'Product created', savedProduct });
	} catch (error) {
		console.error(error);
	}
};
