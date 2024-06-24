import collectionService from '../services/collectionService.js';

class CollectionController {
    async getAllCollections(req, res) {
        try {
            const items = await collectionService.getAllCollectionItems();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(items));
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: error.message }));
        }
    }

    async deleteCollectionsByPlantName(req, res) {
        const { plant_name } = req.params;
        try {
            if (!req.session.data.user) {
                throw new Error('User not logged in');
            }
            const username = req.session.data.user.username;
            const result = await collectionService.deleteCollectionItemsByPlant(username, decodeURI(plant_name));
            res.writeHead(204, { 'Content-Type': 'application/json' });
            res.end();
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: error.message }));
        }
    }

    async updateCollectionByPlantName(req, res) {
        const { plant_name } = req.params;
        const updatedData = req.body;
        try {
            const updatedItem = await collectionService.updateCollectionItemByPlantName(plant_name, updatedData);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(updatedItem));
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: error.message }));
        }
    }

    async createCollection(req, res) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            const plantData = JSON.parse(body);
            const plant_name = plantData.plant_name;
            console.log(plant_name);
            if (plant_name === undefined) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Missing required fields' }));
                return;
            }
            try {
                if (!req.session.data.user) {
                    throw new Error('User not logged in');
                }
                const username = req.session.data.user.username;
                const newItem = await collectionService.createCollectionItem(username, plant_name);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(newItem));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: error.message }));
            }
        });
    }

    async getCollectionsByPlantName(req, res) {
        const { plant_name } = req.params;
        try {
            const items = await collectionService.getCollectionItemsByPlantName(decodeURI(plant_name));
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(items));
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: error.message }));
        }
    }

    async getCollectionsByUsername(req, res) {
        const { username } = req.params;
        try {
            const items = await collectionService.getCollectionItemsByUsername(username);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(items));
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: error.message }));
        }
    }
}

export default new CollectionController();
