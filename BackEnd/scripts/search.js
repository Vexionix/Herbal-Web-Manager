document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-button");
    const resetButton = document.getElementById("reset-button");

    searchButton.addEventListener("click", async () => {
        const criteria = ["family", "species", "place", "color"];
        let selectedOptions = {};

        const searchBar = document.querySelector(".search-bar-container input[type='text']");
        selectedOptions.searchQuery = searchBar.value;

        criteria.forEach(criterion => {
            const selected = document.querySelector(`input[name="${criterion}"]:checked`);
            if (selected) {
                selectedOptions[criterion] = selected.value;
            }
        });

        console.log("Selected Options:", selectedOptions);

        try {
            const response = await fetch('/api/plants/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedOptions),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch search results');
            }

            const data = await response.json();

            const plantContainer = document.getElementById('plant-container');
            plantContainer.innerHTML = '';

            data.forEach(plant => {
                const plantEntry = createPlantEntry(plant);
                plantContainer.appendChild(plantEntry);
            });
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    });

    resetButton.addEventListener("click", () => {
        const radioButtons = document.querySelectorAll("input[type=radio]");
        radioButtons.forEach(radio => {
            radio.checked = false;
        });

        const searchBar = document.querySelector(".search-bar-container input[type='text']");
        searchBar.value = '';
    });
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

    const likeDiv = document.createElement('div');
    likeDiv.className = 'like';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = `favoriteButton${plant.name}`;
    input.className = 'favorite-button';

    const label = document.createElement('label');
    label.setAttribute('for', `favoriteButton${plant.name}`);
    label.className = 'favorite-label';

    const likeEmpty = document.createElement('span');
    likeEmpty.className = 'like_empty';

    const like0 = document.createElement('span');
    like0.className = 'like0';
    likeEmpty.appendChild(like0);

    const likeFill = document.createElement('span');
    likeFill.className = 'like_fill';

    const like5 = document.createElement('span');
    like5.className = 'like5';
    likeFill.appendChild(like5);

    label.appendChild(likeEmpty);
    label.appendChild(likeFill);

    likeDiv.appendChild(input);
    likeDiv.appendChild(label);

    plantDiv.appendChild(infoDiv);
    plantDiv.appendChild(photoDiv);
    plantDiv.appendChild(likeDiv);

    return plantDiv;
}