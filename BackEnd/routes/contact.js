import fs from 'fs/promises';
import path from 'path';
import url from 'url';
import nodemailer from 'nodemailer';
import querystring from 'querystring';
import { getContentType } from '../utils/contentTypes.js';
import { handleError } from '../utils/errorHandlers.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontEndDirectory = path.join(__dirname, '..', "..", 'FrontEnd');

export const handleContact = async (req, res) => {
    try {
        const filePath = path.join(frontEndDirectory, 'contact.html');
        const data = await fs.readFile(filePath);
        const contentType = getContentType(filePath);

        res.writeHead(200, { 'Content-Type': contentType });
        res.write(data);
        res.end();
    } catch (error) {
        handleError(error, res);
    }
};
export const handleContactForm = async (req, res) => {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            const parsedBody = querystring.parse(body);
            const { 'full-name': fullName, email, subject, message } = parsedBody;

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            let mailOptions = {
                from: email,
                to: 'herbalwebmanager@gmail.com',
                subject: `Contact form submission: ${subject}`,
                text: `You have a new message from ${fullName} (${email}):\n\n${message}`
            };

            try {
                await transporter.sendMail(mailOptions);
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Message sent successfully!');
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Failed to send message.');
            }
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
};