import {
    createNewUser,
    findAllUsers,
    updateUserByUsername,
    deleteUserByUsername,
    addLikedPhoto,
    addCollection,
    removeLikedPhoto,
    removeCollection
} from '../controllers/userController.js';

import {
    closeDatabaseConnection
} from '../database/mongooseDatabase.js';

async function testUserFunctions() {
    try {
        // Create a new user
        const newUser = await createNewUser('john_doe', 'password123', 'A user description', [], [], 'profile.jpg', 'john@example.com');
        console.log('New User created:', newUser);

        // Add a liked photo for the user
        const photoId = 'photo123';
        await addLikedPhoto('john_doe', photoId);
        console.log('Added liked photo with ID', photoId, 'for user john_doe');

        // Add a collection for the user
        const collectionId = 'collection456';
        await addCollection('john_doe', collectionId);
        console.log('Added collection with ID', collectionId, 'for user john_doe');

        // Find all users (optional, for verification)
        const users = await findAllUsers();
        console.log('All users:', users);

        // Update user by username
        const updatedUser = await updateUserByUsername('john_doe', { age: 31, description: 'Updated description' });
        console.log('Updated user:', updatedUser);

        // Remove a liked photo for the user (optional)
        // await removeLikedPhoto('john_doe', photoId);
        // console.log('Removed liked photo with ID', photoId, 'for user john_doe');

        // Remove a collection for the user (optional)
        // await removeCollection('john_doe', collectionId);
        // console.log('Removed collection with ID', collectionId, 'for user john_doe');

        // Delete user by username (optional)
        // await deleteUserByUsername('john_doe');
        // console.log('User john_doe deleted successfully');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Close MongoDB connection
        await closeDatabaseConnection();
    }
}

// Call test function
testUserFunctions();
