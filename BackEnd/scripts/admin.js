document.addEventListener('DOMContentLoaded', async () => {
    // User Section
    const addUserForm = document.getElementById('addUserForm');
    const addUserModal = document.getElementById('addUserModal');
    const addUserBtn = document.getElementById('addUserBtn');
    const userTableBody = document.querySelector('#usersTable tbody');

    addUserBtn.addEventListener('click', () => {
        addUserForm.reset();
        addUserModal.style.display = 'block';
    });

    addUserForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userData = {
            username: document.getElementById('userName').value,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            password: document.getElementById('userPassword').value,
            email: document.getElementById('userEmail').value
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
                addUserForm.reset();
                addUserModal.style.display = 'none';
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
            addUserModal.style.display = 'none';
            editUserModal.style.display = 'none';
            plantModal.style.display = 'none';
        });
    });

    window.onclick = (event) => {
        if (event.target == addUserModal) {
            addUserModal.style.display = 'none';
        }
        if (event.target == editUserModal) {
            editUserModal.style.display = 'none';
        }
        if (event.target == plantModal) {
            plantModal.style.display = 'none';
        }
    };


    await fetchUsers();
});
document.addEventListener('DOMContentLoaded', async () => {
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
            posted_by: 'sex',//req.session.data.user.username
            family: document.getElementById('plantFamily').value,
            species: document.getElementById('plantSpecies').value,
            place: document.getElementById('plantPlace').value,
            color: document.getElementById('plantColor').value,
            collected_at: new Date(document.getElementById('collected_at').value),
            views: 0,
            likes: 0
        };
        console.log(plantData);
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
    const editUserForm = document.getElementById('editUserForm');
    const editUserModal = document.getElementById('editUserModal');
    editUserForm.elements.editUserName.value = username;
    editUserForm.elements.editUserEmail.value = email;
    editUserModal.style.display = 'block';
    editUserForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userData = {
            username: editUserForm.elements.editUserName.value,
            firstName: editUserForm.elements.editFirstName.value,
            lastName: editUserForm.elements.editLastName.value,
            password: editUserForm.elements.editUserPassword.value,
            email: editUserForm.elements.editUserEmail.value
        };
        try {
            const response = await fetch(`/api/users/${username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const result = await response.json();
            if (response.ok) {
                editUserForm.reset();
                editUserModal.style.display = 'none';
            } else {
                console.error('Error:', result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
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

