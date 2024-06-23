document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(`/api/users/${username}`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Failed to request password reset.');
            }

            const userData = await response.json();
            const user = userData.userData;
            console.log(user);

            user.password = password;

            const updateResponse = await fetch(`/api/users/${user.username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            if (updateResponse.ok) {
                alert('Password updated successfully! Please log in with your new password.');
                window.location.href = '/login';
            } else {
                throw new Error('Failed to update password.');
            }
        } catch (error) {
            console.error('Password reset failed:', error);
            alert('Password reset failed! User does not exist or the password does not meet the strenght criteria (minimum 8 chars, one lowercase letter, one uppercase letter, a digit, and a special character). Please try again.');
        }
    });
});