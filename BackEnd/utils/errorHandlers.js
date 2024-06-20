import { handleNotFound } from '../routes/notFound.js';
export const handleError = (error, res) => {
    if(error == 'Error: File not found') {
        handleNotFound(null, res);
        return;
    }
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
};