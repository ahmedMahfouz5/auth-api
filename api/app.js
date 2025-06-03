require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());

// Connect to MongoDB (do this once when app is imported or from server.js)
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB connected successfully!');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        if (process.env.NODE_ENV !== 'test') {
            process.exit(1);
        }
    });

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the User Registration API!');
});

app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' });

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(409).json({ message: 'User with this email already exists.' });

        const newUser = new User({ email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully!', user: { id: newUser._id, email: newUser.email } });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: 'Validation error', errors });
        }
        if (error.code === 11000) {
            return res.status(409).json({ message: 'User with this email already exists.' });
        }
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' });

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        res.status(200).json({ message: 'Login successful!', user: { id: user._id, email: user.email } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login.' });
    }
});

module.exports = app;
