import { connect } from '../database/mongooseDatabase.js'; // Import the connect function
import User from '../models/userModel.js'; // Import your User model

async function createNewUser(username, email, age) {
    await connect(); // Ensure connection is established before operations

    try {
        const newUser = await User.create({ username, email, age });
        console.log('User created successfully:', newUser);
        return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

async function findAllUsers() {
    await connect();

    try {
        const users = await User.find({});
        console.log('All users:', users);
        return users;
    } catch (error) {
        console.error('Error finding users:', error);
        throw error;
    }
}

async function updateUserByUsername(username, newAge) {
    await connect();

    try {
        const updatedUser = await User.findOneAndUpdate(
            { username },
            { age: newAge },
            { new: true }
        );
        console.log('User updated successfully:', updatedUser);
        return updatedUser;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

async function deleteUserByUsername(username) {
    await connect();

    try {
        const deletedUser = await User.findOneAndDelete({ username });
        console.log('User deleted successfully:', deletedUser);
        return deletedUser;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
    async function closeDatabaseConnection() {
    try {
        await mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error closing database connection:', error);
        throw error;
    }
}
}

async function closeDatabaseConnection() {
    try {
        await mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error closing database connection:', error);
        throw error;
    }
}
export { createNewUser, findAllUsers, updateUserByUsername, deleteUserByUsername, closeDatabaseConnection };
