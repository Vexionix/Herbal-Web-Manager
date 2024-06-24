document.addEventListener("DOMContentLoaded", () => {
    fetch('/api/plants')
        .then(response => response.json())
        .then(data => {
            const plantContainer = document.getElementById('plant-container');
            data.forEach(plant => {
                fetch('/api/collections/' + plant.name)
                    .then(response2 => response2.json())
                    .then(data2 => {
                        if (data2.length > 0)
                            plantContainer.appendChild(createPlantEntry(plant));
                    })
                    .catch(error => console.error('Error fetching collection data:', error));
            });
        })
        .catch(error => console.error('Error fetching plant data:', error));
});

function createPlantEntry(plant) {
    const plantDiv = document.createElement('div');
    plantDiv.className = 'plant';

    const infoDiv = document.createElement('div');
    infoDiv.className = 'info';

    const h1 = document.createElement('h1');
    h1.textContent = plant.name;
    const p = document.createElement('p');
    p.textContent = 'Species: ' + plant.species;
    const likes = document.createElement('p');
    likes.textContent = 'Likes: ' + plant.likes;
    const views = document.createElement('p');
    views.textContent = 'Views: ' + plant.views;

    infoDiv.appendChild(h1);
    infoDiv.appendChild(p);
    infoDiv.appendChild(likes);
    infoDiv.appendChild(views);

    const photoDiv = document.createElement('div');
    photoDiv.className = 'photo';
    const img = document.createElement('img');
    img.src = `../plants/${plant.name}.jpg`;
    img.alt = `${plant.name}`;

    img.onload = function () {
        photoDiv.appendChild(img);
    };

    img.onerror = function () {
        img.src = `../assets/missing.jpg`;
        photoDiv.appendChild(img);
    };

    photoDiv.appendChild(img);

    plantDiv.appendChild(infoDiv);
    plantDiv.appendChild(photoDiv);

    return plantDiv;
}