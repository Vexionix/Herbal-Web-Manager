import fs from 'fs/promises';
import path from 'path';
import url from 'url';
import querystring from 'querystring';
import nodemailer from 'nodemailer';
import { getContentType } from '../utils/contentTypes.js';
import { handleError } from '../utils/errorHandlers.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontEndDirectory = path.join(__dirname, '..', "..", 'FrontEnd');

export const handleResetRequest = async (req, res) => {
    try {
        const filePath = path.join(frontEndDirectory, 'requestReset.html');
        const data = await fs.readFile(filePath);
        const contentType = getContentType(filePath);

        res.writeHead(200, { 'Content-Type': contentType });
        res.write(data);
        res.end();
    } catch (error) {
        handleError(error, res);
    }
};

export const handleResetForm = async (req, res) => {
    if (req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            const parsedBody = querystring.parse(body);
            const { email } = parsedBody;

            if (!email) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Email is required.');
                return;
            }

            try {
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS
                    }
                });

                let mailOptions = {
                    from: 'herbalwebmanager@gmail.com',
                    to: email,
                    subject: `HeMa | Reset password request`,
                    text: `Reset your password at the following link: http://localhost:5050/recovery`
                };

                await transporter.sendMail(mailOptions);
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Reset link sent successfully!');
            } catch (error) {
                console.error('Error sending email:', error);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Failed to send reset link. Please try again later.');
            }
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
};