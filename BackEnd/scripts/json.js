document.addEventListener('DOMContentLoaded', function () {

    fetchTopPlants()
        .then(data => {

            const jsonButton = document.getElementById('jsonButton');
            if (jsonButton) {
                jsonButton.addEventListener('click', () => {
                    downloadJSON(data, 'top_plants_liked.json');
                });
            } else {
                console.error('JSON button not found in the DOM.');
            }
        })
        .catch(error => console.error('Error:', error));

    fetchTopPlantsViews()
        .then(data => {

            const jsonButtonViews = document.getElementById('jsonButtonViews');
            if (jsonButtonViews) {
                jsonButtonViews.addEventListener('click', () => {
                    downloadJSON(data, 'top_plants_views.json');
                });
            } else {
                console.error('JSON button not found in the DOM.');
            }
        })
        .catch(error => console.error('Error:', error));

    function fetchTopPlants() {
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

    function fetchTopPlantsViews() {
        const collectionUrl = `/api/plants/topViews`;
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
