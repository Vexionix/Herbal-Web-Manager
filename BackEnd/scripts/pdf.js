document.addEventListener('DOMContentLoaded', function () {

  fetchTopPlants()
    .then(data => {

      const pdfButton = document.getElementById('pdfButton');
      if (pdfButton) {
        pdfButton.addEventListener('click', () => {
          downloadPDF(data, 'top_plants_likes.pdf');
        });
      } else {
        console.error('PDF button not found in the DOM.');
      }
    })
    .catch(error => console.error('Error:', error));

  fetchAllPlants()
    .then(data => {

      const pdfButtonOther = document.getElementById('pdfButtonOther');
      if (pdfButtonOther) {
        pdfButtonOther.addEventListener('click', () => {
          downloadOtherPDF(data, 'plants_other_statistics.pdf');
        });
      } else {
        console.error('PDF button not found in the DOM.');
      }
    })
    .catch(error => console.error('Error:', error));

  fetchTopPlantsViews()
    .then(data => {

      const pdfButtonViews = document.getElementById('pdfButtonViews');
      if (pdfButtonViews) {
        pdfButtonViews.addEventListener('click', () => {
          downloadPDF(data, 'top_plants_views.pdf');
        });
      } else {
        console.error('PDF button not found in the DOM.');
      }
    })
    .catch(error => console.error('Error:', error));

  async function fetchTopPlants() {
    const collectionUrl = `/api/plants/top`;
    try {
      const response = await fetch(collectionUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const collectionData = await response.json();
      if (Array.isArray(collectionData) && collectionData.length > 0) {
        return collectionData;
      } else {
        throw new Error('No top plants found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }


  async function fetchTopPlantsViews() {
    const collectionUrl = `/api/plants/topViews`;
    try {
      const response = await fetch(collectionUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const collectionData = await response.json();
      if (Array.isArray(collectionData) && collectionData.length > 0) {
        return collectionData;
      } else {
        throw new Error('No top plants found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  async function fetchAllPlants() {
    const collectionUrl = `/api/plants`;
    try {
      const response = await fetch(collectionUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const collectionData = await response.json();
      if (Array.isArray(collectionData) && collectionData.length > 0) {
        return collectionData;
      } else {
        throw new Error('No top plants found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }


  function downloadPDF(data, filename) {
    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      const pageHeight = doc.internal.pageSize.height;
      const margin = 10;
      let yOffset = margin;
      const lineHeight = 10;

      doc.setFontSize(16);
      doc.text('Top Plants PDF Report', margin, yOffset);
      yOffset += 20;

      doc.setFontSize(12);
      data.forEach((plant, index) => {
        if (yOffset + lineHeight * 5 > pageHeight - margin) {
          doc.addPage();
          yOffset = margin;
        }
        yOffset += 20;
        doc.text(`Plant ${index + 1}:`, margin, yOffset);
        yOffset += lineHeight;
        doc.text(`Name: ${plant.name}`, margin + 5, yOffset);
        yOffset += lineHeight;
        doc.text(`Family: ${plant.family}`, margin + 5, yOffset);
        yOffset += lineHeight;
        doc.text(`Species: ${plant.species}`, margin + 5, yOffset);
      });

      doc.save(filename);

    } catch (error) {
      console.error('Error downloading PDF:', error.message);
    }
  }

  function calculateStatistics(data) {
    const speciesCount = {};
    let totalLikes = 0;
    let totalViews = 0;
    let maxLikes = -1;
    let maxViews = -1;
    let mostLikedPlant = null;
    let mostViewedPlant = null;

    data.forEach(plant => {
      speciesCount[plant.species] = (speciesCount[plant.species] || 0) + 1;
      totalLikes += plant.likes;
      totalViews += plant.views;
      if (plant.likes > maxLikes) {
        maxLikes = plant.likes;
        mostLikedPlant = plant;
      }
      if (plant.views > maxViews) {
        maxViews = plant.views;
        mostViewedPlant = plant;
      }
    });

    const speciesPercentage = Object.keys(speciesCount).map(species => {
      return {
        species: species,
        percentage: ((speciesCount[species] / data.length) * 100).toFixed(2)
      };
    });

    return {
      speciesPercentage,
      mostLikedPlant,
      mostViewedPlant
    };
  }
  function downloadOtherPDF(data, filename) {
    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      const pageHeight = doc.internal.pageSize.height;
      const margin = 10;
      let yOffset = margin;
      const lineHeight = 10;

      doc.setFontSize(16);
      doc.text('Other information about plants - PDF Report', margin, yOffset);
      yOffset += 20;

      const statistics = calculateStatistics(data);

      doc.setFontSize(14);
      doc.text('Most Popular Species', margin, yOffset);
      yOffset += 15;

      doc.setFontSize(12);
      statistics.speciesPercentage.forEach(speciesInfo => {
        if (yOffset + lineHeight > pageHeight - margin) {
          doc.addPage();
          yOffset = margin;
        }
        doc.text(`${speciesInfo.species}: ${speciesInfo.percentage}%`, margin + 5, yOffset);
        yOffset += lineHeight;
      });

      yOffset += 15;
      doc.setFontSize(14);
      doc.text('Plant with the Highest Likes', margin, yOffset);
      yOffset += 15;
      doc.setFontSize(12);
      if (yOffset + lineHeight * 3 > pageHeight - margin) {
        doc.addPage();
        yOffset = margin;
      }
      doc.text(`Name: ${statistics.mostLikedPlant.name}`, margin + 5, yOffset);
      yOffset += lineHeight;
      doc.text(`Likes: ${statistics.mostLikedPlant.likes}`, margin + 5, yOffset);
      yOffset += lineHeight;

      yOffset += 15;
      doc.setFontSize(14);
      doc.text('Plant with the Highest Views', margin, yOffset);
      yOffset += 15;
      doc.setFontSize(12);
      if (yOffset + lineHeight * 3 > pageHeight - margin) {
        doc.addPage();
        yOffset = margin;
      }
      doc.text(`Name: ${statistics.mostViewedPlant.name}`, margin + 5, yOffset);
      yOffset += lineHeight;
      doc.text(`Views: ${statistics.mostViewedPlant.views}`, margin + 5, yOffset);
      yOffset += lineHeight;

      yOffset += 20;
      doc.setFontSize(16);
      doc.text('Detailed Plant Information', margin, yOffset);
      yOffset += 20;

      doc.setFontSize(12);
      data.forEach((plant, index) => {
        if (yOffset + lineHeight * 5 > pageHeight - margin) {
          doc.addPage();
          yOffset = margin;
        }
        yOffset += 20;
        doc.text(`Plant ${index + 1}:`, margin, yOffset);
        yOffset += lineHeight;
        doc.text(`Name: ${plant.name}`, margin + 5, yOffset);
        yOffset += lineHeight;
        doc.text(`Family: ${plant.family}`, margin + 5, yOffset);
        yOffset += lineHeight;
        doc.text(`Species: ${plant.species}`, margin + 5, yOffset);
        yOffset += lineHeight;
        doc.text(`Color: ${plant.color}`, margin + 5, yOffset);
        yOffset += lineHeight;
        doc.text(`Uploaded by: ${plant.posted_by}`, margin + 5, yOffset);
        yOffset += lineHeight;
        doc.text(`Likes: ${plant.likes}`, margin + 5, yOffset);
        yOffset += lineHeight;
        doc.text(`Views: ${plant.views}`, margin + 5, yOffset);
      });

      doc.save(filename);

    } catch (error) {
      console.error('Error downloading PDF:', error.message);
    }
  }
});
