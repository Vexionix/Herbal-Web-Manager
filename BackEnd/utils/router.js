import { handleRequest } from './requestHandler.js';
import { handleContact, handleContactForm } from '../routes/contact.js';
import { handleSignup, handleSignupForm } from '../routes/signup.js';
import { handleLogin, handleLoginForm } from '../routes/login.js';
import { handleNotFound } from '../routes/notFound.js';
import { handlePlantApi } from './handlePlantApi.js';
import { serveStaticFile } from './staticFileMiddleware.js';
import { handleUnsplashRequest } from './unsplashHandler.js';
import { handleFileUpload } from './fileUploadHandler.js';
import url from 'url';
import { handleAdmin } from '../routes/admin.js';
import { handleUserAdd, handleUserGet } from '../api/userApi.js';
import { createOrRetrieveSession, } from './sessionManager.js';
import { handleLogout } from '../routes/logout.js';

const routes = {
    'GET': {
        '/': handleRequest,
        '/home': handleRequest,
        '/about': handleRequest,
        '/help': handleRequest,
        '/unsplash': handleRequest,
        '/catalog': handleRequest,
        '/contact': handleContact,
        '/signup': handleSignup,
        '/login': handleLogin,
        '/notFound': handleNotFound,
        '/api/plants': handlePlantApi,
        '/api/unsplash': handleUnsplashRequest,
        '/admin': handleAdmin,
        '/api/users': handleUserGet
    },
    'POST': {
        '/contact': handleContactForm,
        '/signup': handleSignupForm,
        '/login': handleLoginForm,
        '/logout': handleLogout,
        '/upload': handleFileUpload,
        '/api/users': handleUserAdd
    }
};
const protectedRoutes = ['/home', '/about', '/contact', '/admin', '/unslash', '/catalog'];

export const router = async (req, res) => {
    const { method } = req;
    const parsedUrl = url.parse(req.url);
    const pathname = parsedUrl.pathname;
    const routeHandler = routes[method] && routes[method][pathname];

    const session = createOrRetrieveSession(req, res);
    req.session = session;

    if (protectedRoutes.includes(pathname) && !session.data.user) {
        res.writeHead(302, { 'Location': '/login' });
        res.end();
        return;
    }

    if ((pathname === '/login' || pathname === '/' || pathname === '/signup') && session.data.user) {
        res.writeHead(302, { 'Location': '/home' });
        res.end();
        return;
    }

    if (routeHandler) {
        routeHandler(req, res);
    } else {
        serveStaticFile(req, res);
    }
};