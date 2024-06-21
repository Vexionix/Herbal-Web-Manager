document.addEventListener('DOMContentLoaded', () => {
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

    function addUser(userData) {
        const row = userTableBody.insertRow();
        row.dataset.id = userTableBody.rows.length + 1;
        row.insertCell(0).innerText = userTableBody.rows.length;
        row.insertCell(1).innerText = userData.username;
        row.insertCell(2).innerText = userData.email;
        const actionsCell = row.insertCell(3);
        actionsCell.innerHTML = `<button onclick="editUser(this)">Edit</button> <button onclick="deleteUser(this)">Delete</button>`;
    }

    document.querySelectorAll('.close').forEach(button => {
        button.addEventListener('click', () => {
            userModal.style.display = 'none';
        });
    });

    window.onclick = (event) => {
        if (event.target == userModal) {
            userModal.style.display = 'none';
        }
    };
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

function deleteUser(button) {
    button.closest('tr').remove();
}
