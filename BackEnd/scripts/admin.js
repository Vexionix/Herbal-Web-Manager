document.addEventListener('DOMContentLoaded', async () => {
    // User Section
    const userForm = document.getElementById('userForm');
    const userModal = document.getElementById('userModal');
    const addUserBtn = document.getElementById('addUserBtn');
    const userTableBody = document.querySelector('#usersTable tbody');

    addUserBtn.addEventListener('click', () => {
        userForm.reset();
        userModal.style.display = 'block';
    });

    userForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userData = {
            username: document.getElementById('userName').value,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            password: document.getElementById('userPassword').value,
            description: document.getElementById('userDescription').value,
            email: document.getElementById('userEmail').value,
            profile_img: document.getElementById('userProfileImg').value,
            liked_photos: document.getElementById('userLikedPhotos').value.split(',').map(id => ({ _id: id.trim() })),
            collections: document.getElementById('userCollections').value.split(',').map(id => id.trim()),
        };
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const result = await response.json();
            if (response.ok) {
                addUser(result);
                userForm.reset();
                userModal.style.display = 'none';
            } else {
                console.error('Error:', result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    async function fetchUsers() {
        try {
            const response = await fetch('/api/users');
            const users = await response.json();
            if (response.ok) {
                userTableBody.innerHTML = '';
                users.forEach(user => addUser(user));
            } else {
                console.error('Failed to fetch users:', users.message);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }


    function addUser(userData) {
        const row = userTableBody.insertRow();
        row.dataset.id = userData._id;
        row.insertCell(0).innerText = userTableBody.rows.length;
        row.insertCell(1).innerText = userData.username;
        row.insertCell(2).innerText = userData.email;
        const actionsCell = row.insertCell(3);
        actionsCell.innerHTML = `<button onclick="editUser(this)">Edit</button> <button onclick="deleteUser(this)">Delete</button>`;
    }

    document.querySelectorAll('.close').forEach(button => {
        button.addEventListener('click', () => {
            userModal.style.display = 'none';
            plantModal.style.display = 'none';
        });
    });

    window.onclick = (event) => {
        if (event.target == userModal) {
            userModal.style.display = 'none';
        }
        if (event.target == plantModal) {
            plantModal.style.display = 'none';
        }
    };


    await fetchUsers();

    // Plant Section
    const plantForm = document.getElementById('plantForm');
    const plantModal = document.getElementById('plantModal');
    const addPlantBtn = document.getElementById('addPlantBtn');
    const plantTableBody = document.querySelector('#plantsTable tbody');

    addPlantBtn.addEventListener('click', () => {
        plantForm.reset();
        plantModal.style.display = 'block';
    });

    plantForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const plantData = {
            name: document.getElementById('plantName').value,
            color: document.getElementById('plantColor').value,
            photo: document.getElementById('plantPhoto').value,
            description: document.getElementById('plantDescription').value,
            type: document.getElementById('plantType').value,
        };
        try {
            const response = await fetch('/api/plants', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(plantData),
            });
            const result = await response.json();
            if (response.ok) {
                addPlant(result);
                plantForm.reset();
                plantModal.style.display = 'none';
            } else {
                console.error('Error:', result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    async function fetchPlants() {
        try {
            const response = await fetch('/api/plants');
            const plants = await response.json();
            if (response.ok) {
                plantTableBody.innerHTML = ''; // Clear existing rows
                plants.forEach(plant => addPlant(plant));
            } else {
                console.error('Failed to fetch plants:', plants.message);
            }
        } catch (error) {
            console.error('Error fetching plants:', error);
        }
    }

    function addPlant(plantData) {
        const row = plantTableBody.insertRow();
        row.dataset.id = plantData._id; // Use the plant ID from the database
        row.insertCell(0).innerText = plantTableBody.rows.length;
        row.insertCell(1).innerText = plantData.name;
        row.insertCell(2).innerText = plantData.color;
        const actionsCell = row.insertCell(3);
        actionsCell.innerHTML = `<button onclick="editPlant(this)">Edit</button> <button onclick="deletePlant(this)">Delete</button>`;
    }

    await fetchPlants();
});

function editUser(button) {
    const row = button.closest('tr');
    const id = row.dataset.id;
    const username = row.cells[1].innerText;
    const email = row.cells[2].innerText;
    document.getElementById('userName').value = username;
    document.getElementById('userEmail').value = email;
    document.getElementById('userModal').style.display = 'block';
}

async function deleteUser(button) {
    const row = button.closest('tr');
    button.closest('tr').remove();
    const username = row.cells[1].innerText;
    try {
        const response = await fetch(`/api/users/${username}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log(username);
        if (response.ok) {
            row.remove();
            console.log('User deleted successfully');
        } else {
            const errorData = await response.json();
            console.error('Failed to delete user:', errorData.message);
        }
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

function editPlant(button) {
    const row = button.closest('tr');
    const id = row.dataset.id;
    const name = row.cells[1].innerText;
    const color = row.cells[2].innerText;
    document.getElementById('plantName').value = name;
    document.getElementById('plantColor').value = color;
    document.getElementById('plantModal').style.display = 'block';
}

async function deletePlant(button) {
    const row = button.closest('tr');
    const id = row.dataset.id;

    try {
        const response = await fetch(`/api/plants/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const result = await response.json();

        if (response.ok) {
            row.remove();
            console.log('Plant deleted successfully:', result);
        } else {
            console.error('Failed to delete plant:', result.message);
        }
    } catch (error) {
        console.error('Error deleting plant:', error);
    }
}

