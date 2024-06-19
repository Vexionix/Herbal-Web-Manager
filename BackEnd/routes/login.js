import fs from 'fs/promises';
import path from 'path';
import url from 'url';
import querystring from 'querystring';
import { getContentType } from '../utils/contentTypes.js';
import { handleError } from '../utils/errorHandlers.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontEndDirectory = path.join(__dirname, '..', "..", 'FrontEnd');

export const handleLogin = async (req, res) => {
    try {
        const filePath = path.join(frontEndDirectory, 'login.html');
        const data = await fs.readFile(filePath);
        const contentType = getContentType(filePath);

        res.writeHead(200, { 'Content-Type': contentType });
        res.write(data);
        res.end();
    } catch (error) {
        handleError(error, res);
    }
};

export const handleLoginForm = async (req, res) => {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            const parsedBody = querystring.parse(body);
            // Process the login form data here

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>Login successful!</h1>');
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/html' });
        res.end('<h1>Method Not Allowed</h1>');
    }
};