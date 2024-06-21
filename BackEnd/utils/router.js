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
import { createNewUser } from '../controllers/userController.js';

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
        '/admin': handleAdmin,
        // Add more static paths here if needed
    },
    'POST': {
        '/contact': handleContactForm,
        '/signup': handleSignupForm,
        '/login': handleLoginForm,
        '/upload': handleFileUpload,
        '/api/users': async (req, res) => {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', async () => {
                const userData = JSON.parse(body);
                try {
                    const newUser = await createNewUser(
                        userData.username,
                        userData.password,
                        userData.description,
                        userData.liked_photos,
                        userData.collections,
                        userData.profile_img,
                        userData.email
                    );
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(newUser));
                } catch (error) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Error creating user', error }));
                }
            });
        }
    }
};

export const router = async (req, res) => {
    console.log(req.method, req.url, req.headers['content-type']);
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
