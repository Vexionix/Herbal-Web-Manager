import mongoose from 'mongoose';
import { connect } from '../database/mongooseDatabase.js';
import Plant from '../models/plantModel.js';

async function createNewPlant(name, posted_by, family, species, place, color, views, likes) {
    await connect();

    try {
        const newPlant = await Plant.create({
            name,
            posted_by,
            family,
            species,
            place,
            color,
            views,
            likes
        });
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
        return plants;
    } catch (error) {
        console.error('Error finding plants:', error);
        throw error;
    }
}
export async function findPlantByName(name) {
    await connect();

    try {
        return await Plant.findOne({name}).lean();
    } catch (error) {
        console.error('Error finding plant by name:', error);
        throw error;
    }
}

async function findPlantById(plantId) {
    await connect();

    try {
        const plant = await Plant.findById(plantId);
        if (!plant) {
            throw new Error('Plant not found');
        }
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
