import fs from 'fs';
import path from 'path';
import { handleError } from '../utils/errorHandlers.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDirectory = path.join(__dirname, '..', '..', 'data');
const usersFilePath = path.join(dataDirectory, 'users.json');

// Function to read users from JSON file
const getAllUsersFromFile = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(usersFilePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
};

// Function to write users to JSON file
const saveUsersToFile = (users) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

export const handleUserApi = async (req, res) => {
    try {
        if (req.method === 'GET') {
            const users = await getAllUsersFromFile();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(users));
        } else if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', async () => {
                try {
                    const userData = JSON.parse(body);
                    const users = await getAllUsersFromFile();
                    const newUser = createUser(userData);
                    users.push(newUser); // Assuming createUser returns the new user object
                    await saveUsersToFile(users);
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(newUser));
                } catch (error) {
                    handleError(error, res);
                }
            });
        } else {
            handleError({ message: 'Method Not Allowed' }, res);
        }
    } catch (error) {
        handleError(error, res);
    }
};
