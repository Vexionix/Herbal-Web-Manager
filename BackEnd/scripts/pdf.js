document.addEventListener('DOMContentLoaded', function() {
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
  
    async function downloadPDF(data, filename) {
      try {
        const pdfBlob = await generatePDFBlob(data);
  
        const url = URL.createObjectURL(pdfBlob);
  
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  
        URL.revokeObjectURL(url);
  
        console.log('PDF download successful.');
  
      } catch (error) {
        console.error('Error downloading PDF:', error.message);
      }
    }
  
    function generatePDFBlob(data) {
      return new Promise((resolve, reject) => {
        try {
          const pdfCanvas = document.createElement('canvas');
          const pdfContext = pdfCanvas.getContext('2d');
  
          let yOffset = 10;
          pdfContext.font = '16px Arial';
          pdfContext.fillText('Top Plants PDF Report', 10, yOffset);
          yOffset += 20;
  
          pdfContext.font = '12px Arial';
          data.forEach((plant, index) => {
            yOffset += 20;
            pdfContext.fillText(`Plant ${index + 1}:`, 10, yOffset);
            yOffset += 15;
            pdfContext.fillText(`Name: ${plant.name}`, 15, yOffset);
            yOffset += 15;
            pdfContext.fillText(`Family: ${plant.family}`, 15, yOffset);
            yOffset += 15;
            pdfContext.fillText(`Species: ${plant.species}`, 15, yOffset);
            yOffset += 15;
          });
  
          pdfCanvas.toBlob(blob => {
            if (!blob) {
              reject(new Error('Failed to generate PDF blob.'));
              return;
            }
            resolve(blob);
          }, 'application/pdf');
  
        } catch (error) {
          reject(error);
        }
      });
    }
  });
  