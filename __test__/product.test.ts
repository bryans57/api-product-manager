import request from 'supertest';
import server from '../src/server';

describe('Product test', () => {
	it('should return errors when creating a product with invalid data', async () => {
		// Act
		const response = await request(server).post('/api/products').send({});

		// Assert
		expect(response.status).toBe(400);
		expect(response.body.errors).toHaveLength(3);
		expect(response.body.errors).toEqual(
			expect.arrayContaining([
				{
					location: 'body',
					msg: 'Name must be a string',
					path: 'name',
					type: 'field',
				},
				{
					location: 'body',
					msg: 'Name is required',
					path: 'name',
					type: 'field',
				},
				{
					location: 'body',
					msg: 'Price must be a valid number',
					path: 'price',
					type: 'field',
				},
			])
		);
	});

	it('should return a errors when price is less than 0', async () => {
		// Act
		const response = await request(server)
			.post('/api/products')
			.send({ name: 'Product', price: -1 });

		// Assert
		expect(response.status).toBe(400);
		expect(response.body.errors).toHaveLength(1);
		expect(response.body.errors).toEqual(
			expect.arrayContaining([
				{
					location: 'body',
					msg: 'Price must be a valid number',
					path: 'price',
					type: 'field',
					value: -1,
				},
			])
		);
	});

	it('should return a errors when price different to a letter', async () => {
		// Act
		const response = await request(server)
			.post('/api/products')
			.send({ name: 'Product', price: 'a' });

		// Assert
		expect(response.status).toBe(400);
		expect(response.body.errors).toHaveLength(1);
		expect(response.body.errors).toEqual(
			expect.arrayContaining([
				{
					location: 'body',
					msg: 'Price must be a valid number',
					path: 'price',
					type: 'field',
					value: 'a',
				},
			])
		);
	});

	it('should return a product saved - POST /api/products', async () => {
		// Act
		const response = await request(server).post('/api/products').send({
			name: 'Product - Super Test',
			price: 500,
		});

		// Assert
		expect(response.status).toBe(201);
		expect(response.body.message).toBe('Product created');
		expect(response.body.data).toEqual(
			expect.objectContaining({
				name: 'Product - Super Test',
				price: 500,
			})
		);
	});
});
