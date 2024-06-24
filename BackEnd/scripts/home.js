function searchPlants() {
    window.location.href = "/search";
}

function myPlants() {
    window.location.href = "/myPlants";
}

function myProfile() {
    window.location.href = "/userProfile";
}

function likedPlants() {
    window.location.href = "/likedPlants";
}

function topRedirect() {
    window.location.href = "/top";
}

function unsplash() {
    window.location.href = "/unsplash";
}

document.addEventListener('DOMContentLoaded', () => {
    const openPlantModal = document.getElementById('openPlantModal');
    const plantModal = document.getElementById('plantModal');

    openPlantModal.addEventListener('click', () => {
        plantModal.style.display = 'block';
    });

    const plantForm = document.getElementById('plantForm');

    plantForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const fileInput = document.getElementById('plantImage');
        if (!validateFile(fileInput.files[0])) {
            alert('Please upload a file with a .jpg extension.');
            return;
        }

        const formData = new FormData();
        formData.append('image', fileInput.files[0]);
        formData.append('name', document.getElementById('plantName').value);
        formData.append('species', document.getElementById('plantSpecies').value);
        formData.append('family', document.getElementById('plantFamily').value);
        formData.append('place', document.getElementById('plantPlace').value);
        formData.append('color', document.getElementById('plantColor').value);

        try {
            const uploadResponse = await fetch('/upload', {
                method: 'POST',
                body: formData
            });

            if (!uploadResponse.ok) {
                const errorData = await uploadResponse.json();
                throw new Error(errorData.error || 'Image upload failed');
            }

            const response = await fetch('/api/plants', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.get('name'),
                    family: formData.get('family'),
                    species: formData.get('species'),
                    place: formData.get('place'),
                    color: formData.get('color'),
                    views: 0,
                    likes: 0
                }),
            });

            const result = await response.json();
            if (response.ok) {
                plantForm.reset();
                plantModal.style.display = 'none';
            } else {
                console.error('Error:', result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    document.querySelectorAll('.close').forEach(button => {
        button.addEventListener('click', () => {
            plantModal.style.display = 'none';
        });
    });

    window.onclick = (event) => {
        if (event.target == plantModal) {
            plantModal.style.display = 'none';
        }
    };
});

function validateFile(file) {
    const allowedExtensions = /(\.jpg)$/i;
    return allowedExtensions.test(file.name);
}