import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Product from '../models/Product.model';

export const getProducts = async (req: Request, res: Response) => {
	const products = await Product.findAll({
		order: [['id', 'DESC']],
		attributes: { exclude: ['createdAt', 'updatedAt'] },
	});
	res.json({ data: products });
};

export const getProductById = async (req: Request, res: Response) => {
	const { id } = req.params;
	const product = await Product.findByPk(id);
	if (!product) {
		return res.status(404).json({ message: 'Product not found' });
	}
	res.json({ data: product });
};

export const getProductByName = async (req: Request, res: Response) => {
	const { name } = req.params;
	const product = await Product.findAll({
		where: { name: { [Op.iLike]: `%${name}%` } },
	});
	if (product && !product.length) {
		return res.status(404).json({ message: 'Product not found' });
	}
	res.json({ data: product });
};

export const updateProduct = async (req: Request, res: Response) => {
	const { id } = req.params;
	const [updated] = await Product.update(req.body, { where: { id } });
	if (updated) {
		const updatedProduct = await Product.findByPk(id);
		return res.json({ data: updatedProduct });
	}
	res.status(404).json({ message: 'Product not found' });
};

export const createProduct = async (req: Request, res: Response) => {
	const savedProduct = await Product.create(req.body);
	res.status(201).json({ message: 'Product created', data: savedProduct });
};

export const deleteProduct = async (req: Request, res: Response) => {
	const { id } = req.params;
	const deleted = await Product.destroy({ where: { id } });
	if (deleted) {
		return res.json({ message: 'Product deleted' });
	}
	res.status(404).json({ message: 'Product not found' });
};

export const updateAvailable = async (req: Request, res: Response) => {
	const { id } = req.params;
	const product = await Product.findByPk(id);
	if (!product) {
		return res.status(404).json({ message: 'Product not found' });
	}
	const updated = await product.update({
		availability: !product.availability,
	});
	if (updated) {
		return res.json({ data: product });
	}
	res.status(404).json({ message: 'Product not found' });
};
