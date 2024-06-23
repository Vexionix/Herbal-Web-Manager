import { clearSession } from '../utils/sessionManager.js';

export const handleLogout = (req, res) => {
    clearSession(req, res);
    res.writeHead(302, { 'Location': '/login' });
    res.end();
};