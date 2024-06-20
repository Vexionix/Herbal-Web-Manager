import { handleNotFound } from '../routes/notFound.js';
export const handleError = (error, res) => {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
};