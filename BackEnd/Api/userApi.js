import { createNewUser, findAllUsers, findUserByUsernameOrEmail, deleteUserById, deleteUserByUsername, updateUserByUsername, findUserByUsername } from '../controllers/userController.js';
import bcrypt from 'bcrypt';

export const handleUserAdd = async (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        const userData = JSON.parse(body);

        if (userData.username === undefined || userData.firstName === undefined || userData.lastName === undefined || userData.password === undefined || userData.email === undefined) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Missing required fields' }));
            return;
        }
        if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(userData.password)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Password does not meet the criteria' }));
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid email' }));
            return;
        }

        const existingUser = await findUserByUsernameOrEmail(userData.username, userData.email);
        if (existingUser) {
            res.writeHead(409, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Username or email already exists' }));
            return;
        }
        try {
            const newUser = await createNewUser(
                userData.username,
                userData.firstName,
                userData.lastName,
                userData.password,
                userData.email,
                userData.liked_photos,
                userData.userType
            );

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error creating user', error }));
        }
    });
}

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

export const handleUserGetByUsername = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await findUserByUsername(username);
        if (user) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User returned successfully', userData: user }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
        }
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error finding user', error }));
    }
};

export const handleUserDeleteById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await deleteUserById(id);
        if (user) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User deleted successfully' }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
        }
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error deleting user', error }));
    }
};

export const handleUserDeleteByUsername = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await deleteUserByUsername(username);
        if (user) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User deleted successfully' }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
        }
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error deleting user', error }));
    }
};

export const handleUserUpdateByUsername = async (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {

        const userData = JSON.parse(body);

        if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(userData.password)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Password does not meet the criteria' }));
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid email' }));
            return;
        }

        const saltRounds = 10;
        userData.password = await bcrypt.hash(userData.password, saltRounds);

        if (userData.username === undefined || userData.firstName === undefined || userData.lastName === undefined || userData.password === undefined || userData.email === undefined || !userData.role === undefined) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Missing required fields' }));
            return;
        }

        try {
            const user = await updateUserByUsername(userData.username, userData);
            if (user) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User updated successfully' }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User not found' }));
            }
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error updating user', error }));
        }
    });
}