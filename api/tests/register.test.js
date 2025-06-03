const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app.js'); // Your Express app
const User = require('../models/User');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

afterEach(async () => {
    await User.deleteMany({});
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('POST /api/register', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/register')
            .send({ email: 'test@example.com', password: 'password123' });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('message', 'User registered successfully!');
        expect(res.body.user).toHaveProperty('email', 'testtttttt@example.com'); // it should be test
    });

    it('should not register with missing email or password', async () => {
        const res = await request(app)
            .post('/api/register')
            .send({ email: '', password: '' });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('message', 'Email and password are required.');
    });

    it('should not register a user with existing email', async () => {
        await request(app).post('/api/register').send({ email: 'test@example.com', password: 'password123' });

        const res = await request(app)
            .post('/api/register')
            .send({ email: 'test@example.com', password: 'password123' });

        expect(res.statusCode).toBe(409);
        expect(res.body).toHaveProperty('message', 'User with this email already exists.');
    });
});
