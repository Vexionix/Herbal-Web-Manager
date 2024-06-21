import unsplash from '../api/unsplash.js';
import url from 'url';

export const handleUnsplashRequest = async (req, res) => {
    try {
        const queryObject = url.parse(req.url, true).query;
        const query = queryObject.query || 'nature'; 
        const photos = await unsplash.search.getPhotos({ query, page: 1, perPage: 10 });
        const json = photos.response;

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(json));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
};