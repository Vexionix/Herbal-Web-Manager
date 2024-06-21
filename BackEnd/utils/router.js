import { handleRequest } from './requestHandler.js';
import { handleContact, handleContactForm } from '../routes/contact.js';
import { handleSignup, handleSignupForm } from '../routes/signup.js';
import { handleLogin, handleLoginForm } from '../routes/login.js';
import { handleNotFound } from '../routes/notFound.js';
import { handlePlantApi } from './handlePlantApi.js';
import { serveStaticFile } from './staticFileMiddleware.js';
import { handleUnsplashRequest } from './unsplashHandler.js';
import url from 'url';
import { handleAdmin } from '../routes/admin.js';

const routes = {
    'GET': {
        '/': handleRequest,
        '/about': handleRequest,
        '/help': handleRequest,
        '/unsplash': handleRequest,
        '/contact': handleContact,
        '/signup': handleSignup,
        '/login': handleLogin,
        '/notFound': handleNotFound,
        '/api/plants': handlePlantApi,
        '/api/unsplash': handleUnsplashRequest,
        '/admin': handleAdmin
        // Add more static paths here if needed
    },
    'POST': {
        '/contact': handleContactForm,
        '/signup': handleSignupForm,
        '/login': handleLoginForm,
    }
};

export const router = async (req, res) => {
    const { method } = req;
    const parsedUrl = url.parse(req.url);
    const pathname = parsedUrl.pathname;
    const routeHandler = routes[method] && routes[method][pathname];
    if (routeHandler) {
        routeHandler(req, res);
    } else {
        serveStaticFile(req, res);
    }
};