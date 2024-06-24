document.addEventListener('DOMContentLoaded', function () {
    console.log("DOMContentLoaded event fired");

    fetchTopPlants()
        .then(data => {
            console.log("Data fetched successfully", data);

            const jsonButton = document.getElementById('jsonButton');
            if (jsonButton) {
                console.log("JSON button found");
                jsonButton.addEventListener('click', () => {
                    console.log("JSON button clicked");
                    downloadJSON(data, 'top_plants.json');
                });
            } else {
                console.error('JSON button not found in the DOM.');
            }
        })
        .catch(error => console.error('Error:', error));

    function fetchTopPlants() {
        console.log("Fetching top plants");
        const collectionUrl = `/api/plants/top`;
        return fetch(collectionUrl, {
            method: 'GET',
            headers: {
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(collectionData => {
                console.log("Collection data", collectionData);
                if (Array.isArray(collectionData) && collectionData.length > 0) {
                    return collectionData;
                } else {
                    throw new Error('No top plants found.');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                throw error;
            });
    }

    function downloadJSON(data, filename) {
        console.log("Downloading JSON", data, filename);

        const json = JSON.stringify(data, null, 2); // Pretty-print JSON with 2 spaces
        const jsonBlob = new Blob([json], { type: 'application/json;charset=utf-8;' });

        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(jsonBlob, filename);
        } else {
            const link = document.createElement('a');
            if (link.download !== undefined) {
                const jsonUrl = URL.createObjectURL(jsonBlob);
                link.setAttribute('href', jsonUrl);
                link.setAttribute('download', filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }
});
