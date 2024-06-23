import fs from 'fs/promises';
import path from 'path';
import url from 'url';
import querystring from 'querystring';
import { getContentType } from '../utils/contentTypes.js';
import { handleError } from '../utils/errorHandlers.js';
import { loginUser } from '../utils/loginUtil.js';
import { saveSession } from '../utils/sessionManager.js';

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
            const { username, password } = parsedBody;

            try {
                const user = await loginUser(username, password);

                req.session.data.user = user;
                saveSession(req.session);

                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Login successful!');
            } catch (error) {
                res.writeHead(401, { 'Content-Type': 'text/plain' });
                res.end('Login failed: Invalid username or password');
            }
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
};