document.addEventListener('DOMContentLoaded', function () {
  fetchTopPlants()
    .then(data => {
      const xmlContainer = document.getElementById('xmlContainer');
      const rssFeed = generateRSSFeed(data);
      xmlContainer.textContent = rssFeed;
    })
    .catch(error => console.error('Error:', error));

  function fetchTopPlants() {
    var jwt = getCookie("User");
    var decodedJwt = parseJwt(jwt);

    const collectionUrl = `/api/plants/top`;
    return fetch(collectionUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwt}`
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
        downloadXMLFile(rssFeed);
      })
      .catch(error => console.error('Error:', error));
  }

  function downloadXMLFile(rssFeed) {
    const blob = new Blob([rssFeed], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'top_rss.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const downloadButton = document.getElementById('downloadButton');
  if (downloadButton) {
    downloadButton.addEventListener('click', initiateDownload);
  } else {
    console.error('Download button not found in the DOM.');
  }

  function getCookie(name) {
    var cookieArr = document.cookie.split(";");
    for (var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");
      if (name === cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1]);
      }
    }
    return null;
  }

  function parseJwt(token) {
    if (!token) {
      return null;
    }
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
});
