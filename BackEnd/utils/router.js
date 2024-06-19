import { handleRequest } from './requestHandler.js';
import { handleContact, handleContactForm } from '../routes/contact.js';
import { handleSignup, handleSignupForm } from '../routes/signup.js';
import { handleLogin, handleLoginForm } from '../routes/login.js';

const routes = {
    'GET': {
        '/': handleRequest,
        '/about': handleRequest,
        '/help': handleRequest,
        '/contact': handleContact,
        '/signup': handleSignup,
        '/login': handleLogin,
        // Add more static paths here if needed
    },
    'POST': {
        '/contact': handleContactForm,
        '/signup': handleSignupForm,
        '/login': handleLoginForm,
    }
};

export const router = (req, res) => {
    const { method, url } = req;
    const routeHandler = routes[method] && routes[method][url];
    if (routeHandler) {
        routeHandler(req, res);
    } else {
        handleRequest(req, res);
    }
};