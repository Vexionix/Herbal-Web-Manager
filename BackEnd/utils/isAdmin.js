export const handleIsAdmin = (req, res) => {
    if (req.session.data.user && req.session.data.user.userType === 'admin') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'true' }));
    } else {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'false' }));
    }
};