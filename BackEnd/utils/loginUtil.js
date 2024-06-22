import { connect } from '../database/mongooseDatabase.js';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

export async function loginUser(username, password) {
    await connect();

    try {
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        //console.log('User logged in successfully:', user);
        return user;
    } catch (error) {
        //console.error('Error logging in user:', error);
        throw error;
    }
}