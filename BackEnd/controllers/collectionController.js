import { connect } from '../database/mongooseDatabase.js';
import Collection from '../models/collectionModel.js'; // Adjust path as needed

const createNewCollection = async (name, description, plants, user_id) => {
    await connect();
    try {
        const newCollection = new Collection({ name, description, plants, user_id });
        const savedCollection = await newCollection.save();
        return savedCollection;
    } catch (error) {
        throw new Error(`Could not create new collection: ${error.message}`);
    }
};

const findAllCollections = async () => {
    await connect();
    try {
        const collections = await Collection.find();
        return collections;
    } catch (error) {
        throw new Error(`Could not fetch all collections: ${error.message}`);
    }
};

const findCollectionsByUserId = async (user_id) => {
    await connect();
    try {
        const collections = await Collection.find({ user_id });
        return collections;
    } catch (error) {
        throw new Error(`Could not fetch collections for user ${user_id}: ${error.message}`);
    }
};

const getCollectionById = async (id) => {
    await connect();
    try {
        const collection = await Collection.findById(id);
        return collection;
    } catch (error) {
        throw new Error(`Could not fetch collection with ID ${id}: ${error.message}`);
    }
};

const updateCollection = async (id, name, description, plants, user_id) => {
    await connect();
    try {
        const updatedCollection = await Collection.findByIdAndUpdate(id, { name, description, plants, user_id }, { new: true });
        return updatedCollection;
    } catch (error) {
        throw new Error(`Could not update collection with ID ${id}: ${error.message}`);
    }
};

const deleteCollectionById = async (id) => {
    await connect();
    try {
        const deletedCollection = await Collection.findByIdAndDelete(id);
        return deletedCollection;
    } catch (error) {
        throw new Error(`Could not delete collection with ID ${id}: ${error.message}`);
    }
};

export { createNewCollection, findAllCollections, findCollectionsByUserId, getCollectionById, updateCollection, deleteCollectionById };
