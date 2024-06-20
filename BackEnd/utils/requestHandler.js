import fs from 'fs/promises';
import url from 'url';
import path from 'path';
import { getContentType } from './contentTypes.js';
import { handleError } from './errorHandlers.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontEndDirectory = path.join(__dirname, '..', '..', 'FrontEnd');

const getFilePath = (requestPath) => {
    if (requestPath === '/') {
        return path.join(frontEndDirectory, 'index.html');
    } else if (requestPath === '/about') {
        return path.join(frontEndDirectory, 'about.html');
    } else if (requestPath === '/help') {
    return path.join(frontEndDirectory, 'help.html'); 
    }else if (requestPath === '/notFound') {
        return path.join(frontEndDirectory, 'notFound.html');  
    }else {
        return path.join(frontEndDirectory, requestPath);
    }
};

export const handleRequest = async (req, res) => {
    try {
        if (req.method !== 'GET') {
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            res.end('Method Not Allowed');
            return;
        }
        
        const requestPath = url.parse(req.url).pathname;
        const filePath = getFilePath(requestPath);
        if (!filePath.startsWith(frontEndDirectory)) {
            handleNotFound(null, res);
            return;
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