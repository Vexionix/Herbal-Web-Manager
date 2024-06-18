import http from 'http';
const PORT = process.env.PORT;

const server = http.createServer((req, res) => { 
    if(req.url === '/'){
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Home Page</h1>');
    } else if (req.url == '/about'){
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>About Page</h1>');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>Not found</h1>');
    }
});

server.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`);
});
