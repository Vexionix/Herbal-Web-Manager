import {
    createNewUser,
    findAllUsers,
    updateUserByUsername,
    deleteUserByUsername,
    closeDatabaseConnection // Import closeDatabaseConnection function
} from './controllers/userController.js';

// Example usage
async function exampleUsage() {
    try {
        // Create a new user
        await createNewUser('john_doe', 'john@example.com', 30);

        // Find all users
        const users = await findAllUsers();
        console.log('All users:', users);

        // Update user by username
        await updateUserByUsername('john_doe', 31);

        // Delete user by username
        await deleteUserByUsername('john_doe');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Close MongoDB connection
        await closeDatabaseConnection();
    }
}

// Call example usage function
exampleUsage();
