import { Request, Response } from 'express';
import Product from '../models/Product.model';

export const getProducts = async (req: Request, res: Response) => {
	try {
		const products = await Product.findAll({
			order: [['id', 'DESC']],
			attributes: { exclude: ['createdAt', 'updatedAt'] },
		});
		res.json({ data: products });
	} catch (error) {
		console.error(error);
	}
};

export const getProductById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const product = await Product.findByPk(id);
		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}
		res.json({ data: product });
	} catch (error) {
		console.error(error);
	}
};

export const getProductByName = async (req: Request, res: Response) => {
	try {
		const { name } = req.params;
		const product = await Product.findOne({ where: { name } });
		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}
		res.json({ data: product });
	} catch (error) {
		console.error(error);
	}
};

export const updateProduct = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const [updated] = await Product.update(req.body, { where: { id } });
		if (updated) {
			const updatedProduct = await Product.findByPk(id);
			return res.json({ data: updatedProduct });
		}
		res.status(404).json({ message: 'Product not found' });
	} catch (error) {
		console.error(error);
	}
};

export const createProduct = async (req: Request, res: Response) => {
	try {
		const savedProduct = await Product.create(req.body);
		res.json({ message: 'Product created', savedProduct });
	} catch (error) {
		console.error(error);
	}
};

export const deleteProduct = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const deleted = await Product.destroy({ where: { id } });
		if (deleted) {
			return res.json({ message: 'Product deleted' });
		}
		res.status(404).json({ message: 'Product not found' });
	} catch (error) {
		console.error(error);
	}
};
