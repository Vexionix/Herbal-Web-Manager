document.addEventListener('DOMContentLoaded', function () {
    fetchTopPlants()
        .then(data => {
            const xmlContainer = document.getElementById('xmlContainer');
            const rssFeed = generateRSSFeed(data);
            xmlContainer.textContent = rssFeed;
        })
        .catch(error => console.error('Error:', error));

    function generateRSSFeed(data) {
        let rssFeed = '<?xml version="1.0" encoding="UTF-8"?>\n';
        rssFeed += '<plants>\n';

        rssFeed += '  <title>Top Plants Ranking</title>\n';
        rssFeed += '  <link>../FrontEnd/statistics.html</link>\n';
        rssFeed += '  <description>Top most popular plants ranking</description>\n';

        data.forEach(plant => {// data.slice(0, 3).forEach(plant => { 
            rssFeed += '<plant>\n';
            rssFeed += `<name>${plant.name}</name>\n`;
            rssFeed += `<family>${plant.family}</family>\n`;
            rssFeed += `<species>${plant.species}</species>\n`;
            rssFeed += `<place>${plant.place}</place>\n`;
            rssFeed += `<color>${plant.color}</color>\n`;
            rssFeed += '</plant>\n';
        });

        rssFeed += '</plants>\n';

        return rssFeed;
    }
});

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