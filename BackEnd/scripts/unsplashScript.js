document.querySelector('button').addEventListener('click', async () => {
    const query = document.querySelector('input').value;
    const response = await fetch(`/api/unsplash?query=${query}`);
    if (response.ok) {
        const data = await response.json();
        const imageContainer = document.getElementById('image-container');
        imageContainer.innerHTML = '';

        data.results.forEach(photo => {
            const panel = document.createElement('div');
            panel.className = 'image-panel';
            const anchor = document.createElement('a');
            anchor.href = photo.links.html;
            anchor.target = '_blank';
            const img = document.createElement('img');
            img.src = photo.urls.small;
            anchor.appendChild(img);
            panel.appendChild(anchor);
            imageContainer.appendChild(panel);
        });
    } else {
        console.error('Failed to fetch images:', response.statusText);
    }
});