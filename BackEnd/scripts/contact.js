document.getElementById('contact-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const statusMessage = document.getElementById('status-message');
    statusMessage.textContent = 'Sending...';

    const formData = new FormData(this);

    try {
        const response = await fetch('/contact', {
            method: 'POST',
            body: new URLSearchParams(formData)
        });

        if (response.ok) {
            statusMessage.textContent = 'Message sent!';
            this.reset();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        statusMessage.textContent = 'Operation failed! Try again later.';
    }
});