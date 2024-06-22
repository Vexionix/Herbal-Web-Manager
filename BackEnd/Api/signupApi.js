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


async function handleSignup(username, password, description, profilePicture, email) {
    try {
        const newUser = await createNewUser(username, password, description, [], [], profilePicture, email);
        console.log('New User created:', newUser);
    } catch (error) {
        console.error('Error during signup:', error);
    } 
}