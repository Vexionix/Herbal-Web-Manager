import crypto from 'crypto';

const sessions = {};

const parseCookies = (cookieHeader) => {
    const cookies = {};
    cookieHeader && cookieHeader.split(';').forEach(cookie => {
        const parts = cookie.split('=');
        cookies[parts.shift().trim()] = decodeURI(parts.join('='));
    });
    return cookies;
};

const generateSessionId = () => {
    return crypto.randomBytes(16).toString('hex');
};

export const getSession = (req) => {
    const cookies = parseCookies(req.headers.cookie);
    const sessionId = cookies['session_id'];
    return sessions[sessionId] || null;
};

export const createOrRetrieveSession = (req, res) => {
    let session = getSession(req);
    if (!session) {
        const sessionId = generateSessionId();
        session = { id: sessionId, data: {} };
        sessions[sessionId] = session;
        res.setHeader('Set-Cookie', `session_id=${sessionId}; HttpOnly`);
    }
    return session;
};

export const saveSession = (session) => {
    sessions[session.id] = session;
};

export const clearSession = (req, res) => {
    const session = getSession(req);
    if (session) {
        delete sessions[session.id];
        res.setHeader('Set-Cookie', 'session_id=; HttpOnly; Max-Age=0');
    }
};