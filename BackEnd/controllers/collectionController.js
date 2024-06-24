class CollectionController {
    async getAllCollections(req, res) {
        try {
            const items = await CollectionService.getAllCollectionItems();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(items));
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: error.message }));
        }
    }

    async deleteCollectionsByPlantName(req, res) {
        const { plantName } = req.params;
        try {
            const result = await CollectionService.deleteCollectionItemsByPlant(plantName);
            res.writeHead(204, { 'Content-Type': 'application/json' });
            res.end();
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: error.message }));
        }
    }

    async updateCollectionByPlantName(req, res) {
        const { plantName } = req.params;
        const updatedData = req.body;
        try {
            const updatedItem = await CollectionService.updateCollectionItemByPlantName(plantName, updatedData);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(updatedItem));
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: error.message }));
        }
    }

    async createCollection(req, res) {
        const { username, plantName } = req.body;
        try {
            const newItem = await CollectionService.createCollectionItem(username, plantName);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newItem));
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: error.message }));
        }
    }

    async getCollectionsByUsername(req, res) {
        const { username } = req.params;
        try {
            const items = await CollectionService.getCollectionItemsByUsername(username);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(items));
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: error.message }));
        }
    }
}

const collectionController = new CollectionController();
export default collectionController;
