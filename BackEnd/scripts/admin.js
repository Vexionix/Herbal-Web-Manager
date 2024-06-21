document.addEventListener('DOMContentLoaded', () => {
    const plantModal = document.getElementById('plantModal');
    const userModal = document.getElementById('userModal');
    const plantForm = document.getElementById('plantForm');
    const userForm = document.getElementById('userForm');
    const addPlantBtn = document.getElementById('addPlantBtn');
    const addUserBtn = document.getElementById('addUserBtn');
    const plantTableBody = document.querySelector('#plantsTable tbody');
    const userTableBody = document.querySelector('#usersTable tbody');

    addPlantBtn.addEventListener('click', () => {
        plantModal.style.display = 'block';
    });

    addUserBtn.addEventListener('click', () => {
        userModal.style.display = 'block';
    });

    plantForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const plantData = {
            name: document.getElementById('plantName').value,
            species: document.getElementById('plantSpecies').value,
            color: document.getElementById('plantColor').value,
            description: document.getElementById('plantDescription').value,
            urls: {
                full: document.getElementById('plantFullURL').value,
                regular: document.getElementById('plantRegularURL').value,
                small: document.getElementById('plantSmallURL').value,
            },
            tags: document.getElementById('plantTags').value.split(',').map(tag => ({ type: 'tag', title: tag.trim() })),
        };
        addPlant(plantData);
        plantForm.reset();
        plantModal.style.display = 'none';
    });

    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userData = {
            username: document.getElementById('userName').value,
            password: document.getElementById('userPassword').value,
            description: document.getElementById('userDescription').value,
            email: document.getElementById('userEmail').value,
            profile_img: document.getElementById('userProfileImg').value,
            liked_photos: document.getElementById('userLikedPhotos').value.split(',').map(id => ({ _id: id.trim() })),
            collections: document.getElementById('userCollections').value.split(',').map(id => id.trim()),
        };
        addUser(userData);
        userForm.reset();
        userModal.style.display = 'none';
    });

    function addPlant(plantData) {
        const row = plantTableBody.insertRow();
        row.insertCell(0).innerText = plantTableBody.rows.length + 1;
        row.insertCell(1).innerText = plantData.name;
        row.insertCell(2).innerText = plantData.species;
        const actionsCell = row.insertCell(3);
        actionsCell.innerHTML = `<button onclick="editPlant(this)">Edit</button> <button onclick="deletePlant(this)">Delete</button>`;
    }

    function addUser(userData) {
        const row = userTableBody.insertRow();
        row.insertCell(0).innerText = userTableBody.rows.length + 1;
        row.insertCell(1).innerText = userData.username;
        row.insertCell(2).innerText = userData.email;
        const actionsCell = row.insertCell(3);
        actionsCell.innerHTML = `<button onclick="editUser(this)">Edit</button> <button onclick="deleteUser(this)">Delete</button>`;
    }

    document.querySelectorAll('.close').forEach(button => {
        button.addEventListener('click', () => {
            plantModal.style.display = 'none';
            userModal.style.display = 'none';
        });
    });

    window.onclick = (event) => {
        if (event.target == plantModal) {
            plantModal.style.display = 'none';
        }
        if (event.target == userModal) {
            userModal.style.display = 'none';
        }
    };
});

function editPlant(button) {
    // Implement plant edit functionality
}

function deletePlant(button) {
    button.closest('tr').remove();
}

function editUser(button) {
    // Implement user edit functionality
}

function deleteUser(button) {
    button.closest('tr').remove();
}
