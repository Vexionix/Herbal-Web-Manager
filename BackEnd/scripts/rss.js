document.addEventListener('DOMContentLoaded', function () {

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

  function initiateDownload() {
    fetchTopPlants()
      .then(data => {
        const rssFeed = generateRSSFeed(data);
        downloadXMLFile(rssFeed, 'top_liked.xml');
      })
      .catch(error => console.error('Error:', error));
  }

  function initiateDownloadViews() {
    fetchTopPlantsViews()
      .then(data => {
        const rssFeed = generateRSSFeed(data);
        downloadXMLFile(rssFeed, 'top_views.xml');
      })
      .catch(error => console.error('Error:', error));
  }

  function downloadXMLFile(rssFeed, filename) {
    const blob = new Blob([rssFeed], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const downloadButton = document.getElementById('RSSButton');
  if (downloadButton) {
    downloadButton.addEventListener('click', initiateDownload);
  } else {
    console.error('Download button not found in the DOM.');
  }

  const downloadButtonViews = document.getElementById('RSSButtonViews');
  if (downloadButtonViews) {
    downloadButtonViews.addEventListener('click', initiateDownloadViews);
  } else {
    console.error('Download button not found in the DOM.');
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