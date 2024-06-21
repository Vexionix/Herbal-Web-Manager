import {
    createNewCollection,
    findAllCollections,
    findCollectionsByUserId,
    getCollectionById,
    updateCollection,
    deleteCollectionById
} from '../controllers/collectionController.js'; // Adjust path as needed

import { closeDatabaseConnection } from '../database/mongooseDatabase.js'; // Adjust path as needed

async function testCollectionFunctions() {
    try {
        // Create a new collection
        const plantIds = ['6674d02b5b04dd520d9e7539', 'another_plant_id'];
        const newCollection = await createNewCollection('My Plants', 'A collection of my favorite plants', 1, 'user123');
        console.log('New Collection created:', newCollection);

        // Find all collections
        const collections = await findAllCollections();
        console.log('All collections:', collections);

        // Find collections by user ID
        const userCollections = await findCollectionsByUserId('user123');
        console.log('Collections for user user123:', userCollections);

        // Get collection by ID (assuming you need to fetch and not just delete immediately)
        const collectionIdToDelete = newCollection._id; // Assuming newCollection has the _id field populated
        const collectionToDelete = await getCollectionById(collectionIdToDelete);
        console.log('Collection to delete:', collectionToDelete);

        // Delete collection by ID
        //const deletedCollection = await deleteCollectionById(collectionIdToDelete);
        //console.log('Deleted Collection:', deletedCollection);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Close MongoDB connection
        try {
            await closeDatabaseConnection();
            console.log('MongoDB connection closed.');
        } catch (error) {
            console.error('Error closing MongoDB connection:', error);
        }
    }
}

// Call test function
testCollectionFunctions();
