import { connect } from '../database/mongooseDatabase.js';
import Plant from '../models/plantModel.js';



class PlantService {
    async createNewPlant(name, posted_by, family, species, place, color, views, likes) {
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

    async findAllPlants() {
        await connect();

        try {
            const plants = await Plant.find({});
            return plants;
        } catch (error) {
            console.error('Error finding plants:', error);
            throw error;
        }
    }

    async findPlantTop() {
        await connect();

        try {
            const plants = await Plant.find({}).sort({ likes: -1 });
            return plants;
        } catch (error) {
            console.error('Error finding plants:', error);
            throw error;
        }
    }

    async findPlantTopViews() {
        await connect();
        try {
            const plants = await Plant.find({}).sort({ views: -1 });
            return plants;
        } catch (error) {
            console.error('Error finding plants:', error);
            throw error;
        }
    }


    async findPlantByName(name) {
        await connect();

        try {
            return await Plant.findOne({ name }).lean();
        } catch (error) {
            console.error('Error finding plant by name:', error);
            throw error;
        }
    }

    async findPlantById(plantId) {
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

    async updatePlantById(plantId, newData) {
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

    async updatePlantByName(name, newData) {
        await connect();
        try {
            const updatedPlant = await Plant.findOneAndUpdate(
                { name: name },
                newData,
                {
                    new: true,
                    upsert: false
                }
            );

            if (updatedPlant) {
                console.log('Plant updated successfully:', updatedPlant);
            } else {
                console.log('No matching plant found with username:', name);
            }

            return updatedPlant;
        } catch (error) {
            console.error('Error updating plant:', error);
            throw error;
        }
    }

    async deletePlantById(plantId) {
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

    async searchPlants(searchOptions) {
        await connect();

        try {
            const query = {};

            if (searchOptions.searchQuery) {
                query.name = { $regex: searchOptions.searchQuery, $options: 'i' };
            }

            if (searchOptions.family) {
                query.family = searchOptions.family;
            }
            if (searchOptions.species) {
                query.species = searchOptions.species;
            }
            if (searchOptions.color) {
                query.color = searchOptions.color;
            }
            if (searchOptions.place) {
                query.place = searchOptions.place;
            }

            const plants = await Plant.find(query).lean();
            console.log('Plants found:', plants);
            return plants;
        } catch (error) {
            console.error('Error searching plants:', error);
            throw error;
        }
    }
}



export default new PlantService();