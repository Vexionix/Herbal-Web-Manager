document.addEventListener('DOMContentLoaded', function() {
    const pdfButton = document.getElementById('pdfButton');

    if (pdfButton) {
      pdfButton.addEventListener('click', async () => {
        try {
          const data = await fetchTopPlants();
          if (!data || data.length === 0) {
            throw new Error('No data returned from API.');
          }

          console.log('Fetched data:', data);

          const pdfBlob = await generatePDFBlob(data);
          if (!pdfBlob) {
            throw new Error('Failed to generate PDF blob.');
          }

          console.log('Generated PDF blob:', pdfBlob);

          downloadPDF(pdfBlob);
        } catch (error) {
          console.error('Error:', error.message);
        }
      });
    } else {
      console.error('PDF button not found in the DOM.');
    }

    async function fetchTopPlants() {
      // Example function to fetch data from an API
      return [
        { name: 'Plant A', family: 'Family A', species: 'Species A' },
        { name: 'Plant B', family: 'Family B', species: 'Species B' },
        { name: 'Plant C', family: 'Family C', species: 'Species C' }
      ];
    }

    async function generatePDFBlob(data) {
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

    function downloadPDF(pdfBlob) {
      try {
        const url = URL.createObjectURL(pdfBlob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'top_plants.pdf');
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
  });