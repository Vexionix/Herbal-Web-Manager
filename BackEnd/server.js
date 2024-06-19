import http from 'http';
import { handleIndex } from './routes/index.js';
import { handleAbout } from './routes/about.js';
import { handleHelp } from './routes/help.js';
import { handleContact } from './routes/contact.js';
import { handleSignup } from './routes/signup.js';
import { handleLogin } from './routes/login.js';
import { serveImage, serveCSS } from './utils/staticFileMiddleware.js';

const PORT = process.env.PORT || 5050;

const server = http.createServer((req, res) => {
    console.log(req.url);
    switch (req.url) {
        case '/':
            handleIndex(req, res);
            break;
        case '/about':
            handleAbout(req, res);
            break;
        case '/help':
            handleHelp(req, res);
            break;
        case '/contact':
            handleContact(req, res);
            break;
        case '/signup':
            handleSignup(req, res);
            break;
        case '/login':
            handleLogin(req, res);
            break;
        default:
            if (req.url.startsWith('/assets') || req.url.startsWith('/plants')) {
                serveImage(req, res);
            } else if (req.url.endsWith('.css')){
                serveCSS(req, res);
            } else {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>');
            }
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});