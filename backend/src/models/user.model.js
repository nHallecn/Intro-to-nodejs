// 1. THE MODEL FIX (user.model.js)
// IMPORTANT: Bcrypt hashes are 60 characters long. 
// Your 'maxLength: 50' on the password field will cause a validation error 
// during .save(), which likely triggers a catch block in your controller.

import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minLength: 1,
            maxLength: 50,
        },

        password: {
            type: String,
            required: true,
            minLength: 6,
            // REMOVED maxLength: 50 because hashed passwords exceed this limit
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    
    this.password = await bcrypt.hash(this.password, 10);
    // Removed next();
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;


// 2. THE CONTROLLER FIX (user.controller.js)
// The error "next is not a function" usually happens here.
// Ensure 'next' is included in the function parameters.

export const registerUser = async (req, res, next) => { // <--- MUST INCLUDE 'next' HERE
    try {
        const { username, email, password } = req.body;
        
        const user = await User.create({
            username,
            email,
            password
        });

        res.status(201).json({
            success: true,
            data: user
        });
    } catch (error) {
        // If 'next' was missing from the arguments above, 
        // calling it here causes: "TypeError: next is not a function"
        next(error); 
    }
};