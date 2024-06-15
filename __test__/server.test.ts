import request from 'supertest';
import server from '../src/server';

describe('Server test', () => {
	it('should return a message to validate if it is working - GET /api', async () => {
		const response = await request(server).get('/api');
		expect(response.status).toBe(200);
		expect(response.body).toEqual({ message: 'API is working' });
	});
});
