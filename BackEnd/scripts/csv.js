document.addEventListener('DOMContentLoaded', function () {

  fetchTopPlants()
    .then(data => {

      const csvButton = document.getElementById('csvButton');
      if (csvButton) {
        csvButton.addEventListener('click', () => {
          downloadCSV(data, 'top_plants_likes.csv');
        });
      } else {
        console.error('CSV button not found in the DOM.');
      }
    })
    .catch(error => console.error('Error:', error));

  fetchTopPlantsViews()
    .then(data => {

      const csvButtonViews = document.getElementById('csvButtonViews');
      if (csvButtonViews) {
        csvButtonViews.addEventListener('click', () => {
          downloadCSV(data, 'top_plants_views.csv');
        });
      } else {
        console.error('CSV button not found in the DOM.');
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

  function convertToCSV(data) {

    const csvHeader = Object.keys(data[0]).join(',') + '\n';
    const csvRows = data.map(obj => {
      return Object.values(obj).map(value => {
        if (typeof value === 'string') {
          value = value.replace(/"/g, '""');
          return `"${value}"`;
        }
        return value;
      }).join(',');
    }).join('\n');
    return csvHeader + csvRows;
  }

  function downloadCSV(data, filename) {

    const csv = convertToCSV(data);
    const csvBlob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(csvBlob, filename);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        const csvUrl = URL.createObjectURL(csvBlob);
        link.setAttribute('href', csvUrl);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
});
