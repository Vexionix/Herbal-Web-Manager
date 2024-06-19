import path from 'path';
import url from 'url';
import fs from 'fs/promises';
import { getContentType } from './contentTypes.js';
import { handleError } from './errorHandlers.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontEndDirectory = path.join(__dirname, '..', "..", 'FrontEnd');
const assetsDirectory = path.join(__dirname, '..', "..", 'assets');
const plantsDirectory = path.join(__dirname, '..', "..", 'plants');

export const serveImage = async (req, res) => {
    const requestPath = url.parse(req.url).pathname;
    let filePath;

    if (requestPath.startsWith('/assets')) {
        filePath = path.join(assetsDirectory, requestPath.replace('/assets', ''));
    } else if (requestPath.startsWith('/plants')) {
        filePath = path.join(plantsDirectory, requestPath.replace('/plants', ''));
    }

    try {
        if (filePath) {
            const data = await fs.readFile(filePath);
            const contentType = getContentType(filePath);
            res.writeHead(200, { 'Content-Type': contentType });
            res.write(data);
            res.end();
        } else {
            throw new Error('File not found');
        }
    } catch (error) {
        handleError(error, res);
    }
};

export const serveCSS = async (req, res) => {
    const requestPath = url.parse(req.url).pathname;
    let filePath;

    if (requestPath.endsWith('.css')) {
        filePath = path.join(frontEndDirectory, requestPath);
    }

    try {
        if (filePath) {
            const data = await fs.readFile(filePath);
            const contentType = getContentType(filePath);
            res.writeHead(200, { 'Content-Type': contentType });
            res.write(data);
            res.end();
        } else {
            throw new Error('File not found');
        }
    } catch (error) {
        handleError(error, res);
    }
};