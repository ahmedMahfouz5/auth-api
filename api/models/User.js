const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For password hashing

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Ensures email addresses are unique
        lowercase: true, // Store emails in lowercase
        trim: true, // Remove whitespace from email
        match: [/.+\@.+\..+/, 'Please fill a valid email address'] // Basic email regex validation
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to hash the password before saving
userSchema.pre('save', async function(next) {
    // Only hash if the password has been modified (or is new)
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
        this.password = await bcrypt.hash(this.password, salt); // Hash the password
        next();
    } catch (error) {
        next(error); // Pass error to the next middleware
    }
});

// Method to compare passwords (for login, not part of registration directly but good to have)
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;