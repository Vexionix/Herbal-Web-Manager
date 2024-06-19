import path from 'path';

const contentTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
};

export const getContentType = (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    return contentTypes[ext] || 'application/octet-stream';
};