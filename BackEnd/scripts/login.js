document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        try {
            const response = await fetch('/login', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                console.log('Login successful!');
                window.location.href = '/home';
            } else {
                const errorMessage = await response.text();
                alert(errorMessage);
            }
        } catch (error) {
            alert('Error during login. Please try again.');
        }
    });
});