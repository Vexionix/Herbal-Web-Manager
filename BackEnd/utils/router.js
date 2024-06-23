import { handleRequest } from './requestHandler.js';
import { handleContact, handleContactForm } from '../routes/contact.js';
import { handleSignup, handleSignupForm } from '../routes/signup.js';
import { handleLogin, handleLoginForm } from '../routes/login.js';
import { handleRecovery } from '../routes/recovery.js';
import { handleResetRequest, handleResetForm } from '../routes/requestReset.js';
import { handleNotFound } from '../routes/notFound.js';
import { handlePlantApi } from './handlePlantApi.js';
import { serveStaticFile } from './staticFileMiddleware.js';
import { handleUnsplashRequest } from './unsplashHandler.js';
import { handleFileUpload } from './fileUploadHandler.js';
import url from 'url';

import { handleAdmin } from '../routes/admin.js';
import { handleUserAdd, handleUserGet, handleUserDeleteByUsername, handleUserUpdateByUsername, handleUserGetByUsername } from '../api/userApi.js';
import { createOrRetrieveSession } from './sessionManager.js';
import { handleLogout } from '../routes/logout.js';
import { handlePlantAdd, handlePlantGet, handlePlantDeleteById } from '../api/plantApi.js';

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
        '/requestReset': handleResetRequest,
        '/recovery': handleRecovery,
        '/notFound': handleNotFound,
        '/api/plants': handlePlantApi,
        '/api/unsplash': handleUnsplashRequest,
        '/admin': handleAdmin,
        '/api/users': handleUserGet,
        '/api/users/:username': handleUserGetByUsername,
        '/api/plants': handlePlantGet
    },
    'POST': {
        '/contact': handleContactForm,
        '/requestReset': handleResetForm,
        '/signup': handleSignupForm,
        '/login': handleLoginForm,
        '/logout': handleLogout,
        '/upload': handleFileUpload,
        '/api/users': handleUserAdd,
        '/api/plants': handlePlantAdd
    },
    'PUT': {
        '/api/users/:username': handleUserUpdateByUsername
    },
    'DELETE': {
        '/api/users/:username': handleUserDeleteByUsername,
        '/api/plants/:id': handlePlantDeleteById
    }
};

const protectedRoutes = ['/home', '/about', '/contact', '/unsplash', '/catalog'];

const matchRoute = (method, pathname) => {
    const routeEntries = Object.entries(routes[method] || {});
    for (const [route, handler] of routeEntries) {
        const routeParts = route.split('/');
        const pathParts = pathname.split('/');
        if (routeParts.length === pathParts.length) {
            const params = {};
            let match = true;
            for (let i = 0; i < routeParts.length; i++) {
                if (routeParts[i].startsWith(':')) {
                    params[routeParts[i].substring(1)] = pathParts[i];
                } else if (routeParts[i] !== pathParts[i]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                return { handler, params };
            }
        }
    }
    return null;
};

export const router = async (req, res) => {
    const { method } = req;
    const parsedUrl = url.parse(req.url);
    const pathname = parsedUrl.pathname;
    const routeMatch = matchRoute(method, pathname);

    const session = createOrRetrieveSession(req, res);
    req.session = session;

    if (protectedRoutes.includes(pathname) && !session.data.user) {
        res.writeHead(302, { 'Location': '/login' });
        res.end();
        return;
    }

    if ((pathname === '/login' || pathname === '/' || pathname === '/signup' || pathname === '/recovery' || pathname == '/requestReset') && session.data.user) {
        res.writeHead(302, { 'Location': '/home' });
        res.end();
        return;
    }

    if (routeMatch) {
        const { handler, params } = routeMatch;
        req.params = params;
        handler(req, res);
    } else {
        serveStaticFile(req, res);
    }
};