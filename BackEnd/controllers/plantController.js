import mongoose from 'mongoose';
import { connect } from '../database/mongooseDatabase.js';

// Define the plant schema
const plantSchema = new mongoose.Schema({
    id: String,
    name: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    color: String,
    photo: String,
    description: String,
    type: String,
    views: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 }
});

// Create the Plant model
const Plant = mongoose.model('Plant', plantSchema);

export default Plant;

// Controller functions
async function createNewPlant(plantData) {
    await connect();

    try {
        const newPlant = await Plant.create(plantData);
        console.log('Plant created successfully:', newPlant);
        return newPlant;
    } catch (error) {
        console.error('Error creating plant:', error);
        throw error;
    }
}

async function findAllPlants() {
    await connect();

    try {
        const plants = await Plant.find({});
        console.log('All plants:', plants);
        return plants;
    } catch (error) {
        console.error('Error finding plants:', error);
        throw error;
    }
}

async function findPlantById(plantId) {
    await connect();

    try {
        const plant = await Plant.findById(plantId);
        console.log('Plant found:', plant);
        return plant;
    } catch (error) {
        console.error('Error finding plant:', error);
        throw error;
    }
}

async function updatePlantById(plantId, newData) {
    await connect();

    try {
        newData.updated_at = new Date();
        const updatedPlant = await Plant.findByIdAndUpdate(
            plantId,
            newData,
            { new: true }
        );
        console.log('Plant updated successfully:', updatedPlant);
        return updatedPlant;
    } catch (error) {
        console.error('Error updating plant:', error);
        throw error;
    }
}

async function deletePlantById(plantId) {
    await connect();

    try {
        const deletedPlant = await Plant.findByIdAndDelete(plantId);
        console.log('Plant deleted successfully:', deletedPlant);
        return deletedPlant;
    } catch (error) {
        console.error('Error deleting plant:', error);
        throw error;
    }
}

export {
    createNewPlant,
    findAllPlants,
    findPlantById,
    updatePlantById,
    deletePlantById
};
