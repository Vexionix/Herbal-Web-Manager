import path from 'path';
import url from 'url';
import fs from 'fs/promises';
import { getContentType } from './contentTypes.js';
import { handleError } from './errorHandlers.js';
import { handleNotFound } from '../routes/notFound.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontEndDirectory = path.join(__dirname, '..', "..", 'FrontEnd');
const assetsDirectory = path.join(__dirname, '..', "..", 'assets');
const plantsDirectory = path.join(__dirname, '..', "..", 'plants');
const dataDirectory = path.join(__dirname, '..', "..", 'data');

export const serveStaticFile = async (req, res) => {
    const requestPath = url.parse(req.url).pathname;

    if (req.url === '/favicon.ico') {
        res.writeHead(204);
        res.end();
        return;
    }   
    
    let filePath;
    if (requestPath.startsWith('/assets')) {
        filePath = path.join(assetsDirectory, requestPath.replace('/assets', ''));
    } else if (requestPath.startsWith('/plants')) {
        filePath = path.join(plantsDirectory, requestPath.replace('/plants', ''));
    } else if (requestPath.endsWith('.css')) {
        filePath = path.join(frontEndDirectory, requestPath);
    } else if (requestPath.endsWith('.js')) {
        filePath = path.join(__dirname, '..', '..', requestPath);
    } else if (requestPath.endsWith('.json')) {
        filePath = path.join(__dirname, '..', '..', requestPath);
    }

    try {
        if (filePath) {
            const data = await fs.readFile(filePath); 
            const contentType = getContentType(filePath);
            res.writeHead(200, { 'Content-Type': contentType });
            res.write(data);
            res.end();
        } else {            
            handleNotFound(null, res);
            return;
        }
    } catch (error) {
        handleError(error, res);
    }
};