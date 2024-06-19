import fs from 'fs/promises';
import path from 'path';
import url from 'url';
import { getContentType } from '../utils/contentTypes.js';
import { handleError } from '../utils/errorHandlers.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontEndDirectory = path.join(__dirname, '..', "..", 'FrontEnd');
const assetsDirectory = path.join(__dirname, '..', "..", 'assets'); 
const plantsDirectory = path.join(__dirname, '..', "..", 'plants'); 


export const handleIndex = async (req, res) => {
    try {
        const filePath = path.join(frontEndDirectory, 'index.html');
        const data = await fs.readFile(filePath);
        const contentType = getContentType(filePath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.write(data);
        res.end();
    } catch (error) {
        handleError(error, res);
    }
};