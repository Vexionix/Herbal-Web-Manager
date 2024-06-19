import http from 'http';
import { router } from './utils/router.js';

const PORT = process.env.PORT;

const server = http.createServer((req, res) => {
    router(req, res);
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});