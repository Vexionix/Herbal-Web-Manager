import fs from 'fs/promises';
import url from 'url';
import path from 'path';
import { getContentType } from './utils/contentTypes.js';
import { handleError } from './utils/errorHandlers.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontEndDirectory = path.join(__dirname, '..', 'FrontEnd');
const assetsDirectory = path.join(__dirname, '..', 'assets');
const plantsDirectory = path.join(__dirname, '..', 'plants');

const getFilePath = (requestPath) => {
    if (requestPath === '/') {
        return path.join(frontEndDirectory, 'index.html');
    } else if (requestPath.startsWith('/assets')) {
        return path.join(assetsDirectory, requestPath.replace('/assets', ''));
    } else if (requestPath.startsWith('/plants')) {
        return path.join(plantsDirectory, requestPath.replace('/plants', ''));
    } else if (requestPath === '/about') {
        return path.join(frontEndDirectory, 'about.html');
    } else if (requestPath === '/help') {
    return path.join(frontEndDirectory, 'help.html'); 
    } else {
        return path.join(frontEndDirectory, requestPath);
    }
};

export const handleRequest = async (req, res) => {
    try {
        if (req.method !== 'GET') {
            res.writeHead(405, { 'Content-Type': 'text/html' });
            res.end('<h1>Method Not Allowed</h1>');
            return;
        }

        const requestPath = url.parse(req.url).pathname;
        if (req.url === '/favicon.ico') {
            res.writeHead(204);
            res.end();
            return;
        }


        const filePath = getFilePath(requestPath);
        if (!filePath.startsWith(frontEndDirectory) && !filePath.startsWith(assetsDirectory) && !filePath.startsWith(plantsDirectory)) {
            throw new Error('File not found');
        }

        const data = await fs.readFile(filePath);
        const contentType = getContentType(filePath);

        res.writeHead(200, { 'Content-Type': contentType });
        res.write(data);
        res.end();
    } catch (error) {
        handleError(error, res);
    }
};