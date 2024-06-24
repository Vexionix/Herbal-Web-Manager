import plantService from '../services/plantService.js';

class PlantController {
    async handlePlantAdd(req, res) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            const plantData = JSON.parse(body);
            plantData.posted_by = req.session.data.user.username;
            if (!plantData.name || !plantData.color || !plantData.posted_by || !plantData.family || !plantData.species || !plantData.place || plantData.views === undefined || plantData.likes === undefined) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Missing required fields' }));
                return;
            }


            const existingPlant = await plantService.findPlantByName(plantData.name);
            if (existingPlant) {
                res.writeHead(409, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Plantname already exists' }));
                return;
            }
            try {
                const newPlant = await plantService.createNewPlant(plantData.name, plantData.posted_by, plantData.family, plantData.species, plantData.place, plantData.color, plantData.views, plantData.likes);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(newPlant));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error creating plant', error }));
            }
        });
    }

    async handlePlantGet(req, res) {
        try {
            const plants = await plantService.findAllPlants();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(plants));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error fetching plants', error }));
        }
    }

    async handlePlantGetTop(req, res) {
        try {
            const plants = await plantService.findPlantTop();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(plants));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error fetching plants', error }));
        }
    }

    async handlePlantGetCurrentUser(req, res) {
        try {
            const plants = (await plantService.findAllPlants()).filter(plant => plant.posted_by === req.session.data.user.username);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(plants));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error fetching plants', error }));
        }
    }

    async handlePlantGetById(req, res) {
        const plantId = req.url.split('/').pop();

        try {
            const plant = await plantService.findPlantById(plantId);
            if (!plant) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Plant not found' }));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(plant));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error fetching plant', error }));
        }
    }

    async handlePlantUpdateById(req, res) {
        const plantId = req.url.split('/').pop();
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            const plantData = JSON.parse(body);

            try {
                const updatedPlant = await plantService.updatePlantById(plantId, plantData);
                if (!updatedPlant) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Plant not found' }));
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(updatedPlant));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error updating plant', error }));
            }
        });
    }

    async handlePlantUpdateByName(req, res) {
        const plantName = decodeURIComponent(req.url.split('/').pop());
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            const plantData = JSON.parse(body);

            try {
                const updatedPlant = await plantService.updatePlantByName(plantName, plantData);
                if (!updatedPlant) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Plant not found' }));
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(updatedPlant));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error updating plant', error }));
            }
        });
    }

    async handlePlantDeleteById(req, res) {
        const plantId = req.url.split('/').pop();

        try {
            const deletedPlant = await plantService.deletePlantById(plantId);
            if (!deletedPlant) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Plant not found' }));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(deletedPlant));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error deleting plant', error }));
        }
    }

    async handlePlantSearch(req, res) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            const searchOptions = JSON.parse(body);

            try {
                const plants = await plantService.searchPlants(searchOptions);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(plants));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error fetching plants', error }));
            }
        });

    }
}

const plantController = new PlantController();
export default plantController;