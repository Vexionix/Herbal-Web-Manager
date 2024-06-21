import { connect } from '../database/mongooseDatabase.js';
import Plant from '../models/plantModel.js';

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

async function updatePlantById(plantId, newData) {
    await connect();

    try {
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
    updatePlantById,
    deletePlantById
};
