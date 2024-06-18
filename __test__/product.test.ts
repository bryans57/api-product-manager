import request from 'supertest';
import server from '../src/server';

describe('Product test - POST /api/products', () => {
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

	it('should return a product saved ', async () => {
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

describe('Product test - GET /api/products', () => {
	it('should exist the route /api/products', async () => {
		// Act
		const response = await request(server).get('/api/products');

		// Assert
		expect(response.status).not.toBe(404);
	});

	it('should return a list of products', async () => {
		// Act
		const response = await request(server).get('/api/products');

		// Assert
		expect(response.status).toBe(200);
		expect(response.body.data).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					name: 'Product - Super Test',
					price: 500,
				}),
			])
		);
	});
});

describe('Product test - GET /api/products/:id', () => {
	it('should return a product by id', async () => {
		// Act
		const response = await request(server).get('/api/products/1');

		// Assert
		expect(response.status).toBe(200);
		expect(response.body.data).toEqual(
			expect.objectContaining({
				name: 'Product - Super Test',
				price: 500,
			})
		);
	});

	it('should return a error when the product does not exist', async () => {
		// Act
		const response = await request(server).get('/api/products/100');

		// Assert
		expect(response.status).toBe(404);
		expect(response.body.message).toBe('Product not found');
	});
});

describe('Product test - GET /api/products/name/:name', () => {
	it('should return a product by name', async () => {
		// Act
		const response = await request(server).get('/api/products/name/Super');

		// Assert
		expect(response.status).toBe(200);
		expect(response.body.data).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					name: 'Product - Super Test',
					price: 500,
				}),
			])
		);
	});

	it('should return a error when the product does not exist', async () => {
		// Act
		const response = await request(server).get('/api/products/name/noproduct');

		// Assert
		expect(response.status).toBe(404);
		expect(response.body.message).toBe('Product not found');
	});
});

describe('Product test - PUT /api/products/:id', () => {
	it('should return a error when the product does not exist', async () => {
		// Act
		const response = await request(server).put('/api/products/500').send({
			name: 'Product - Super Test - Put',
			price: 1300,
			availability: true,
		});

		// Assert
		expect(response.status).toBe(404);
		expect(response.body.message).toBe('Product not found');
	});

	it('should return a errors when input data is wrong', async () => {
		// Act
		const response = await request(server).put('/api/products/501').send({});

		// Assert
		expect(response.status).toBe(400);
		expect(response.body.errors).toHaveLength(4);
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
				{
					location: 'body',
					msg: 'Availability must be a boolean',
					path: 'availability',
					type: 'field',
				},
			])
		);
	});

	it('should return a product updated', async () => {
		// Act
		const productToUpdate = {
			name: 'Product - Super Test - Put',
			price: 1300,
			availability: true,
		};
		const response = await request(server)
			.put('/api/products/1')
			.send(productToUpdate);

		// Assert
		expect(response.status).toBe(200);
		expect(response.body.data).toEqual(
			expect.objectContaining(productToUpdate)
		);
	});
});

describe('Product test - PATCH /api/products/:id', () => {
	it('should return a error when the product does not exist', async () => {
		// Act
		const response = await request(server).patch('/api/products/500');

		// Assert
		expect(response.status).toBe(404);
		expect(response.body.message).toBe('Product not found');
	});

	it('should return a error when not valid url', async () => {
		// Act
		const response = await request(server).patch('/api/products/abc');

		// Assert
		expect(response.status).toBe(400);
		expect(response.body.errors).toHaveLength(2);
	});

	it('should return a error when not valid id', async () => {
		// Act
		const response = await request(server).patch('/api/products/0');

		// Assert
		expect(response.status).toBe(400);
		expect(response.body.errors).toHaveLength(1);
		expect(response.body.errors).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					location: 'params',
					msg: 'Id must be greater than 0',
					value: '0',
				}),
			])
		);
	});

	it('should return a product updated', async () => {
		// Act
		const response = await request(server).patch('/api/products/1');

		// Assert
		expect(response.status).toBe(200);
		expect(response.body.data).toEqual(
			expect.objectContaining({
				availability: false,
			})
		);
	});
});

describe('Product test - DELETE /api/products/:id', () => {
	it('should return a error when the product does not exist', async () => {
		// Act
		const response = await request(server).delete('/api/products/500');

		// Assert
		expect(response.status).toBe(404);
		expect(response.body.message).toBe('Product not found');
	});

	it('should return a error when not valid url', async () => {
		// Act
		const response = await request(server).delete('/api/products/abc');

		// Assert
		expect(response.status).toBe(400);
		expect(response.body.errors).toHaveLength(2);
	});

	it('should return a error when not valid id', async () => {
		// Act
		const response = await request(server).delete('/api/products/0');

		// Assert
		expect(response.status).toBe(400);
		expect(response.body.errors).toHaveLength(1);
		expect(response.body.errors).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					location: 'params',
					msg: 'Id must be greater than 0',
					value: '0',
				}),
			])
		);
	});

	it('should return a product deleted', async () => {
		// Act
		const response = await request(server).delete('/api/products/1');

		// Assert
		expect(response.status).toBe(200);
		expect(response.body.message).toBe('Product deleted');
	});
});
