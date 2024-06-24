document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/users/current');
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();

        document.getElementById('username').textContent = userData.username;
        document.getElementById('email').textContent = userData.email;
        document.getElementById('firstName').textContent = userData.firstName;
        document.getElementById('lastName').textContent = userData.lastName;
    } catch (error) {
        document.getElementById('username').textContent = '-';
        document.getElementById('email').textContent = '-';
        document.getElementById('firstName').textContent = '-';
        document.getElementById('lastName').textContent = '-';
        console.error('Error fetching user data:', error);
    }

    const updatePasswordForm = document.getElementById('updatePasswordForm');

    updatePasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;

        try {
            const response = await fetch('/api/users/updatePassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "currentPassword": currentPassword, "newPassword": newPassword }),
            });

            const result = await response.json();
            if (response.ok) {
                alert('Password updated successfully');
                updatePasswordForm.reset();
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error updating password:', error);
            alert('An error occurred while updating the password.');
        }
    });
});