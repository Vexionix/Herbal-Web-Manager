document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('Image uploaded successfully');
        } else {
            const errorData = await response.json(); 
            if (errorData && errorData.error) {
                alert('Upload failed: ' + errorData.error);
            } else {
                alert('Upload failed: Unknown error');
            }
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during upload');
    }
});