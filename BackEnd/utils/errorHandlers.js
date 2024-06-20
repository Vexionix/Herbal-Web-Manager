import { handleNotFound } from '../routes/notFound.js';
export const handleError = (error, res) => {
    console.error(error);
    const statusCode = res.statusCode || 404;
    if (res.statusCode === 404) {
        handleNotFound(res);
    }else{
        const statusCode = res.statusCode || 500;
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>${statusCode} Internal Server Error</h1>');
    }
};