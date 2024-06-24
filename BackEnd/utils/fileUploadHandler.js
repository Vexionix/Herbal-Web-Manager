import multiparty from 'multiparty';
import fs from 'fs';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '..', '..', 'plants');

const isJpg = (filename) => {
    const ext = path.extname(filename).toLowerCase();
    return ext === '.jpg';
}

export const handleFileUpload = (req, res) => {
    const form = new multiparty.Form({
        maxFilesSize: 100 * 1024 * 1024
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error(err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'File upload error' }));
            return;
        }

        const uploadedFile = files.image ? files.image[0] : null;
        const username = fields.name ? fields.name[0] : null;

        if (!uploadedFile) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'No file uploaded' }));
            return;
        }

        if (!isJpg(uploadedFile.originalFilename)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Only JPEG files (.jpg) are allowed' }));
            return;
        }

        if (uploadedFile.size > 10 * 1024 * 1024) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'File size exceeds the limit of 10 MB' }));
            return;
        }

        const oldPath = uploadedFile.path;
        const originalFilename = uploadedFile.originalFilename;
        const filename = username + '.jpg' || 'failed_upload_' + Date.now() + '_' + originalFilename;

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        const newPath = path.join(uploadDir, filename);

        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'File upload error' }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'File uploaded successfully' }));
            }
        });
    });
};