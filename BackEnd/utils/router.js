import { handleRequest } from './requestHandler.js';
import { handleContact, handleContactForm } from '../routes/contact.js';
import { handleSignup, handleSignupForm } from '../routes/signup.js';
import { handleLogin, handleLoginForm } from '../routes/login.js';
import { handleRecovery } from '../routes/recovery.js';
import { handleResetRequest, handleResetForm } from '../routes/requestReset.js';
import { handleNotFound } from '../routes/notFound.js';
import { handleSearch } from '../routes/search.js';
import { handleLikedPlants } from '../routes/likedPlants.js';
import { handleUserProfile } from '../routes/userProfile.js';
import { handleTop } from '../routes/top.js';
import { handleRSS } from '../routes/rss.js';
import { handleMyPlants } from '../routes/myPlants.js';
import { handlePlantApi } from './handlePlantApi.js';
import { serveStaticFile } from './staticFileMiddleware.js';
import { handleUnsplashRequest } from './unsplashHandler.js';
import { handleFileUpload } from './fileUploadHandler.js';
import url from 'url';

import { handleAdmin } from '../routes/admin.js';
import { createOrRetrieveSession } from './sessionManager.js';
import { handleLogout } from '../routes/logout.js';
import userController from '../controllers/userController.js';
import plantController from '../controllers/plantController.js';

const routes = {
    'GET': {
        '/': handleRequest,
        '/home': handleRequest,
        '/about': handleRequest,
        '/help': handleRequest,
        '/unsplash': handleRequest,
        '/top': handleTop,
        '/myPlants': handleMyPlants,
        '/RSS': handleRSS,
        '/likedPlants': handleLikedPlants,
        '/contact': handleContact,
        '/search': handleSearch,
        '/signup': handleSignup,
        '/login': handleLogin,
        '/requestReset': handleResetRequest,
        '/recovery': handleRecovery,
        '/userProfile': handleUserProfile,
        '/notFound': handleNotFound,
        '/statistics': handleRequest,
        '/api/plants': handlePlantApi,
        '/api/unsplash': handleUnsplashRequest,
        '/admin': handleAdmin,
        '/api/users': userController.handleUserGet,
        '/api/users/current': userController.handleUserGetCurrentUser,
        '/api/users/:username': userController.handleUserGetByUsername,
        '/api/plants': plantController.handlePlantGet,
        '/api/plants/current': plantController.handlePlantGetCurrentUser,
        '/api/plants/top': plantController.handlePlantGetTop,
        '/api/plants/topViews': plantController.handlePlantGetTopViews
    },
    'POST': {
        '/contact': handleContactForm,
        '/requestReset': handleResetForm,
        '/signup': handleSignupForm,
        '/login': handleLoginForm,
        '/logout': handleLogout,
        '/upload': handleFileUpload,
        '/api/users': userController.handleUserAdd,
        '/api/users/updatePassword': userController.handleUserUpdatePassword,
        '/api/plants': plantController.handlePlantAdd,
        '/api/plants/search': plantController.handlePlantSearch
    },
    'PUT': {
        '/api/users/:username': userController.handleUserUpdateByUsername,
        '/api/plants/:name': plantController.handlePlantUpdateByName
    },
    'DELETE': {
        '/api/users/:username': userController.handleUserDeleteByUsername,
        '/api/plants/:id': plantController.handlePlantDeleteById
    }
};

const protectedRoutes = ['/home', '/about', '/contact', '/search', '/statistics', '/unsplash', '/top', '/myPlants', '/likedPlants', '/userProfile', '/logout', '/upload'];

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

    if (pathname === '/admin' && ((session.data.user && session.data.user.userType !== 'admin') || !session.data.user)) {
        res.writeHead(302, { 'Location': '/home' });
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