document.getElementById('reset-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const statusMessage = document.getElementById('status-message');
    statusMessage.textContent = 'Sending...';

    const formData = new FormData(this);

    try {
        const response = await fetch('/requestReset', {
            method: 'POST',
            body: new URLSearchParams(formData)
        });

        if (response.ok) {
            statusMessage.textContent = 'Reset link sent successfully!';
            this.reset();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        statusMessage.textContent = 'Failed to send reset link. Try again later.';
    }
});