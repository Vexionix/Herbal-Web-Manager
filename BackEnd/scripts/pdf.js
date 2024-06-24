document.addEventListener('DOMContentLoaded', function () {
  console.log("DOMContentLoaded event fired");

  fetchTopPlants()
    .then(data => {
      console.log("Data fetched successfully", data);

      const pdfButton = document.getElementById('pdfButton');
      if (pdfButton) {
        console.log("PDF button found");
        pdfButton.addEventListener('click', () => {
          console.log("PDF button clicked");
          downloadPDF(data, 'top.pdf');
        });
      } else {
        console.error('PDF button not found in the DOM.');
      }
    })
    .catch(error => console.error('Error:', error));

  async function fetchTopPlants() {
    console.log("Fetching top plants");
    const collectionUrl = `/api/plants/top`;
    try {
      const response = await fetch(collectionUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const collectionData = await response.json();
      console.log("Collection data", collectionData);
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
      console.log('PDF download successful.');

    } catch (error) {
      console.error('Error downloading PDF:', error.message);
    }
  }
});