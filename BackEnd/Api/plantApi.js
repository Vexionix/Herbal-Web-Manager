import { createNewPlant, findAllPlants, findPlantById, updatePlantById, deletePlantById } from '../controllers/plantController.js';

export const handlePlantAdd = async (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        const plantData = JSON.parse(body);

        if (!plantData.name || !plantData.color || !plantData.photo || !plantData.description || !plantData.type) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Missing required fields' }));
            return;
        }

        try {
            const newPlant = await createNewPlant(plantData);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newPlant));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error creating plant', error }));
        }
    });
};

export const handlePlantGet = async (req, res) => {
    try {
        const plants = await findAllPlants();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(plants));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error fetching plants', error }));
    }
};

export const handlePlantGetById = async (req, res) => {
    const plantId = req.url.split('/').pop();

    try {
        const plant = await findPlantById(plantId);
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
};

export const handlePlantUpdateById = async (req, res) => {
    const plantId = req.url.split('/').pop();
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        const plantData = JSON.parse(body);

        try {
            const updatedPlant = await updatePlantById(plantId, plantData);
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
};

export const handlePlantDeleteById = async (req, res) => {
    const plantId = req.url.split('/').pop();

    try {
        const deletedPlant = await deletePlantById(plantId);
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
};
