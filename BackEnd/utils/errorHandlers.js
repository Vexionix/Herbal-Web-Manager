export const handleError = (error, res) => {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end('<h1>Internal Server Error</h1>');
};