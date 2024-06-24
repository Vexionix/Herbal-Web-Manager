import userService from '../services/userService.js';
import bcrypt from 'bcrypt';

class UserController {
    async handleUserAdd(req, res) {
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

            const existingUser = await userService.findUserByUsernameOrEmail(userData.username, userData.email);
            if (existingUser) {
                res.writeHead(409, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Username or email already exists' }));
                return;
            }
            try {
                const newUser = await userService.createNewUser(
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

    async handleUserGet(req, res) {
        try {
            const users = await userService.findAllUsers();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(users));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error fetching users', error }));
        }
    };

    async handleUserGetCurrentUser(req, res) {
        try {
            if (!req.session.data.user) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'No user connected' }));
                return;
            }
            const user = await userService.findUserByUsername(req.session.data.user.username);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error fetching users', error }));
        }
    };

    async handleUserGetByUsername(req, res) {
        const { username } = req.params;
        try {
            const user = await userService.findUserByUsername(username);
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

    async handleUserDeleteById(req, res) {
        const { id } = req.params;
        try {
            const user = await userService.deleteUserById(id);
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

    async handleUserDeleteByUsername(req, res) {
        const { username } = req.params;

        try {
            if (!req.session.data.user || req.session.data.user.userType !== 'admin') {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Unauthorized' }));
                return;
            }
            const user = await userService.deleteUserByUsername(username);
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

    async handleUserUpdateByUsername(req, res) {
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
                const user = await userService.updateUserByUsername(userData.username, userData);
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

    async handleUserUpdatePassword(req, res) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {

            const input = JSON.parse(body);
            if (!req.session.data.user) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'No user connected' }));
                return;
            }

            const user = await userService.findUserByUsername(req.session.data.user.username);

            const userData = {};
            const isPasswordValid = await bcrypt.compare(input.currentPassword, user.password);
            if (isPasswordValid) {
                if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(input.newPassword)) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Password does not meet the criteria' }));
                    return;
                }
                const saltRounds = 10;
                const newPassword = await bcrypt.hash(input.newPassword, saltRounds);
                userData.password = newPassword;
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Current password is not correct.' }));
                return;
            }

            userData.username = req.session.data.user.username;
            userData.email = user.email;
            userData.firstName = user.firstName;
            userData.lastName = user.lastName;
            console.log(userData);

            if (userData.username === undefined || userData.firstName === undefined || userData.lastName === undefined || userData.password === undefined || userData.email === undefined || !userData.role === undefined) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Missing required fields' }));
                return;
            }

            try {
                const user = await userService.updateUserByUsername(userData.username, userData);
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
}

export default new UserController();