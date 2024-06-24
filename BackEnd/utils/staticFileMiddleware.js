import path from 'path';
import url from 'url';
import fs from 'fs/promises';
import { getContentType } from './contentTypes.js';
import { handleError } from './errorHandlers.js';
import { handleNotFound } from '../routes/notFound.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontEndDirectory = path.join(__dirname, '..', '..', 'FrontEnd');
const assetsDirectory = path.join(__dirname, '..', '..', 'assets');
const plantsDirectory = path.join(__dirname, '..', '..', 'plants');
const uploadedDirectory = path.join(__dirname, '..', '..', 'uploaded');

export const serveStaticFile = async (req, res) => {
    const requestPath = url.parse(req.url).pathname;
    let filePath;
    if (requestPath.endsWith('.css')) {
        filePath = path.join(frontEndDirectory, requestPath.split('/').pop());
    } else if (requestPath.endsWith('.ico')) {
        filePath = path.join(assetsDirectory, requestPath.split('/').pop());
    } else if (requestPath.endsWith('.js')) {
        const parts = requestPath.split('/');
        const fileName = parts.pop();
        const subDir = parts.pop();
        const dir = parts.pop();
        filePath = path.join(__dirname, '..', '..', dir, subDir, fileName);
    } else if (requestPath.endsWith('.json')) {
        filePath = path.join(__dirname, '..', '..', requestPath);
    } else if (requestPath.includes('/assets')) {
        if (requestPath.split('/assets').pop().split('/').length != 2) {
            res.writeHead(302, { 'Location': '/notFound' });
            res.end();
            return;
        }
        filePath = path.join(assetsDirectory, requestPath.split('/assets').pop());
    } else if (requestPath.includes('/plants')) {
        if (requestPath.split('/plants').pop().split('/').length != 2) {
            res.writeHead(302, { 'Location': '/notFound' });
            res.end();
            return;
        }
        filePath = path.join(plantsDirectory, requestPath.split('/plants').pop());
    } else if (requestPath.includes('/uploaded')) {
        if (requestPath.split('/uploaded').pop().split('/').length != 2) {
            res.writeHead(302, { 'Location': '/notFound' });
            res.end();
            return;
        }
        filePath = path.join(uploadedDirectory, requestPath.split('/uploaded').pop());
    }

    try {
        if (filePath) {
            const data = await fs.readFile(filePath);
            const contentType = getContentType(filePath);
            res.writeHead(200, { 'Content-Type': contentType });
            res.write(data);
            res.end();
        } else {
            res.writeHead(302, { 'Location': '/notFound' });
            res.end();
            return;
        }
    } catch (error) {
        handleError(error, res);
    }
};