import { createNewUser, findAllUsers, findUserByUsernameOrEmail } from '../controllers/userController.js';

export const handleUserAdd = async (req, res) =>{
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        const userData = JSON.parse(body);
        const existingUser = await findUserByUsernameOrEmail(userData.username, userData.email);
        console.log(existingUser);
            if (existingUser) {
                res.writeHead(409, { 'Content-Type': 'application/json' }); // Conflict status code
                res.end(JSON.stringify({ message: 'Username or email already exists' }));
                return;
            }
        try {
            const newUser = await createNewUser(
                userData.username,
                userData.firstName,
                userData.lastName,
                userData.password,
                userData.description,
                userData.liked_photos,
                userData.collections,
                userData.profile_img,
                userData.email
            );

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error creating user', error }));
        }
    });}
    
    export const handleUserGet = async (req, res) => {
        try {
            const users = await findAllUsers();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(users));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error fetching users', error }));
        }
    };