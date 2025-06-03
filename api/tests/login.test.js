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

describe('POST /api/login', () => {
    beforeEach(async () => {
        await request(app).post('/api/register').send({ email: 'login@example.com', password: 'pass1234' });
    });

    it('should login a user with correct credentials', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({ email: 'login@example.com', password: 'pass1234' });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Login successful!');
        expect(res.body.user).toHaveProperty('email', 'login@example.com');
    });

    it('should not login with incorrect password', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({ email: 'login@example.com', password: 'wrongpass' });

        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty('message', 'Invalid email or password.');
    });

    it('should not login a non-existing user', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({ email: 'nonexist@example.com', password: 'pass1234' });

        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty('message', 'Invalid email or password.');
    });

    it('should not login with missing fields', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({ email: '', password: '' });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('message', 'Email and password are required.');
    });
});
