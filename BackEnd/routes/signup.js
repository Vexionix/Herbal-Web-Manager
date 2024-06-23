import fs from 'fs/promises';
import path from 'path';
import url from 'url';
import fetch from 'node-fetch';
import { getContentType } from '../utils/contentTypes.js';
import { handleError } from '../utils/errorHandlers.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontEndDirectory = path.join(__dirname, '..', "..", 'FrontEnd');

export const handleSignup = async (req, res) => {
    try {
        const filePath = path.join(frontEndDirectory, 'signup.html');
        const data = await fs.readFile(filePath);
        const contentType = getContentType(filePath);

        res.writeHead(200, { 'Content-Type': contentType });
        res.write(data);
        res.end();
    } catch (error) {
        handleError(error, res);
    }
};

export const handleSignupForm = async (req, res) => {
    if (req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const response = await fetch('http://localhost:' + process.env.PORT + '/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: body
                });

                if (!response.ok) {
                    if (response.status === 409) {
                        res.writeHead(409, { 'Content-Type': 'text/plain' });
                        res.end('Signup failed: User with the same username or email already exists.');
                        return;
                    }
                    else if (response.status === 400) {
                        res.writeHead(400, { 'Content-Type': 'text/plain' });
                        res.end('Signup failed: Fields do not meet the criteria, check the input data. (Passwords should be strong enough, mails should be valid etc.)');
                        return;
                    }
                    throw new Error('Failed to fetch users');
                }

                res.writeHead(302, { 'Location': '/login' });
                res.end();
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Signup failed: Unknown error occured.');
            }
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
};