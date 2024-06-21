import {
    createNewPlant,
    findAllPlants,
    updatePlantById,
    deletePlantById
} from '../controllers/plantController.js';

import {
    closeDatabaseConnection
} from '../database/mongooseDatabase.js';

async function testPlantFunctions() {
    try {
        // Create a new plant
        const newPlantData = {
            name: 'Sunflower',
            color: 'Yellow',
            description: 'A beautiful sunflower plant',
            likes: 100,
            tags: ['flower', 'sunflower'],
            views: 500,
            downloads: 50
            // Add other fields as needed
        };
        const newPlant = await createNewPlant(newPlantData);
        console.log('New Plant created:', newPlant);

        // Find all plants
        const plants = await findAllPlants();
        console.log('All plants:', plants);

        // Update plant by ID
        const plantIdToUpdate = newPlant._id;
        const updatedPlant = await updatePlantById(plantIdToUpdate, { description: 'Updated description' });
        console.log('Updated Plant:', updatedPlant);

        // Delete plant by ID
        //const plantIdToDelete = newPlant._id;
        //await deletePlantById(plantIdToDelete);
        //console.log('Plant deleted successfully');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Close MongoDB connection
        await closeDatabaseConnection();
    }
}

// Call test function
testPlantFunctions();
