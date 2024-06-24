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
        const plantName = document.getElementById('plantName').value;
        const plantSpecies = document.getElementById('plantSpecies').value;
        const plantFamily = document.getElementById('plantFamily').value;
        const plantPlace = document.getElementById('plantPlace').value;
        const plantColor = document.getElementById('plantColor').value;

        if (!validateFile(fileInput.files[0])) {
            alert('Please upload a file with a .jpg extension.');
            return;
        }

        if (!plantName || !plantSpecies || !plantFamily || !plantPlace || !plantColor) {
            alert('Please fill in all the fields.');
            return;
        }

        const formData = new FormData();
        formData.append('image', fileInput.files[0]);
        formData.append('name', plantName);

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
                    name: plantName,
                    family: plantFamily,
                    species: plantSpecies,
                    place: plantPlace,
                    color: plantColor,
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