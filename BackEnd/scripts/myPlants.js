document.addEventListener("DOMContentLoaded", () => {
    fetch(`/api/plants/current`)
        .then(response => response.json())
        .then(data => {
            const plantContainer = document.getElementById('plant-container');
            data.forEach(plant => {
                const plantEntry = createPlantEntry(plant);
                plantContainer.appendChild(plantEntry);
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
    p.textContent = plant.description;

    infoDiv.appendChild(h1);
    infoDiv.appendChild(p);

    const photoDiv = document.createElement('div');
    photoDiv.className = 'photo';
    const img = document.createElement('img');
    img.src = '../plants/' + plant.name + '.jpg';
    img.alt = plant.name;

    photoDiv.appendChild(img);

    plantDiv.appendChild(infoDiv);
    plantDiv.appendChild(photoDiv);

    return plantDiv;
}