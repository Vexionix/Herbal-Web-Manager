import { connect } from '../database/mongooseDatabase.js';
import User from '../models/userModel.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

async function createNewUser(username, firstName, lastName, password, description, liked_photos, collections, profile_img, email) {
    await connect();

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({
            username,
            firstName,
            lastName,
            password: hashedPassword,
            description,
            liked_photos,
            collections,
            profile_img,
            email
        });
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
        // console.log('All users:', users);
        return users;
    } catch (error) {
        console.error('Error finding users:', error);
        throw error;
    }
}

async function findUserByUsernameOrEmail(username, email) {
    await connect();

    try {
        return await User.findOne({ $or: [{ username }, { email }] }).lean();
    } catch (error) {
        console.error('Error finding user by username or email:', error);
        throw error;
    }
}

async function updateUserByUsername(username, newData) {
    await connect();

    try {
        const updatedUser = await User.findOneAndUpdate(
            { username: username },
            newData,
            {
                new: true,
                upsert: false
            }
        );

        if (updatedUser) {
            console.log('User updated successfully:', updatedUser);
        } else {
            console.log('No matching user found with username:', username);
        }

        return updatedUser;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

async function deleteUserById(id) {
    await connect();

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            throw new Error('User not found');
        }

        console.log('User deleted successfully:', deletedUser);
        return deletedUser;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    } finally {
        mongoose.disconnect();
        console.log('Database disconnected');
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
}

async function addLikedPhoto(username, photoId) {
    await connect();

    try {
        const updatedUser = await User.findOneAndUpdate(
            { username },
            { $addToSet: { liked_photos: { _id: photoId } } },
            { new: true }
        );
        console.log('Liked photo added successfully for user:', updatedUser);
        return updatedUser;
    } catch (error) {
        console.error('Error adding liked photo:', error);
        throw error;
    }
}
async function deleteAllUsers() {
    await connect();

    try {
        const result = await User.deleteMany({});
        console.log('All users deleted successfully:', result);
        return result;
    } catch (error) {
        console.error('Error deleting all users:', error);
        throw error;
    }
}
async function removeLikedPhoto(username, photoId) {
    await connect();

    try {
        const updatedUser = await User.findOneAndUpdate(
            { username },
            { $pull: { liked_photos: { _id: photoId } } },
            { new: true }
        );
        console.log('Liked photo removed successfully for user:', updatedUser);
        return updatedUser;
    } catch (error) {
        console.error('Error removing liked photo:', error);
        throw error;
    }
}

async function addCollection(username, collectionId) {
    await connect();

    try {
        // Convert collectionId to ObjectId
        const collectionObjectId = mongoose.Types.ObjectId(collectionId);

        const updatedUser = await User.findOneAndUpdate(
            { username },
            { $addToSet: { collections: collectionObjectId } },
            { new: true }
        );

        console.log('Collection added successfully for user:', updatedUser);
        return updatedUser;
    } catch (error) {
        console.error('Error adding collection:', error);
        throw error;
    }
}

async function removeCollection(username, collectionId) {
    await connect();

    try {
        const updatedUser = await User.findOneAndUpdate(
            { username },
            { $pull: { collections: { _id: collectionId } } },
            { new: true }
        );
        console.log('Collection removed successfully for user:', updatedUser);
        return updatedUser;
    } catch (error) {
        console.error('Error removing collection:', error);
        throw error;
    }
}


export {
    createNewUser,
    findAllUsers,
    updateUserByUsername,
    deleteUserByUsername,
    addLikedPhoto,
    removeLikedPhoto,
    addCollection,
    removeCollection,
    findUserByUsernameOrEmail,
    deleteAllUsers,
    deleteUserById
};

