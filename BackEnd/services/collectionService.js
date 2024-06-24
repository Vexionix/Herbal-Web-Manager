import Collection from "../models/collectionModel.js";
import { connect } from '../database/mongooseDatabase.js';
class CollectionService {
    async createCollectionItem(username, plantName) {
        try {
            const newItem = new Collection({
                username,
                plant_name: plantName
            });
            const savedItem = await newItem.save();
            return savedItem;
        } catch (error) {
            throw new Error(`Error creating collection item: ${error.message}`);
        }
    }

    async getAllCollectionItems() {
        try {
            const items = await Collection.find({});
            return items;
        } catch (error) {
            throw new Error(`Error fetching collection items: ${error.message}`);
        }
    }

    async getCollectionItemsByUsername(username) {
        try {
            const items = await Collection.find({ username: username });
            return items;
        } catch (error) {
            throw new Error(`Error fetching collection items by username: ${error.message}`);
        }
    }

    async getCollectionItemsByPlantName(plantName) {
        try {
            const items = await Collection.find({ plant_name: plantName });
            return items;
        } catch (error) {
            throw new Error(`Error fetching collection items by plant name: ${error.message}`);
        }
    }

    async updateCollectionItemByPlantName(plantName, updatedData) {
        try {
            const updatedItem = await Collection.findOneAndUpdate(
                { plant_name: plantName },
                updatedData,
                { new: true }
            );
            return updatedItem;
        } catch (error) {
            throw new Error(`Error updating collection item by plant name: ${error.message}`);
        }
    }

    async updateCollectionItemByPlantAndUsername(plantName, username, updatedData) {
        try {
            const updatedItem = await Collection.findOneAndUpdate(
                { plant_name: plantName, username: username },
                updatedData,
                { new: true }
            );
            return updatedItem;
        } catch (error) {
            throw new Error(`Error updating collection item by plant name and username: ${error.message}`);
        }
    }

    async deleteCollectionItemsByPlant(plantName) {
        try {
            const result = await Collection.deleteMany({ plant_name: plantName });
            return result;
        } catch (error) {
            throw new Error(`Error deleting collection items by plant name: ${error.message}`);
        }
    }

    async deleteCollectionItemByPlantAndUsername(plantName, username) {
        try {
            const deletedItem = await Collection.findOneAndDelete({ plant_name: plantName, username: username });
            return deletedItem;
        } catch (error) {
            throw new Error(`Error deleting collection item by plant name and username: ${error.message}`);
        }
    }
}

const collectionService = new CollectionService();
export default collectionService;
