const fs = require('fs');
const csv = require('csv-parser');
const { Request, Product } = require('../models');

exports.uploadCSV = async (req, res) => {
  try {
    if (!req.file) {
      console.error('File not uploaded');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;

    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          // Process the CSV data and store it in the database
          const request = await Request.create({ status: 'Processing' });

          for (const item of results) {
            await Product.create({
              requestId: request.id,
              serialNumber: item['Serial Number'],
              productName: item['Product Name'],
              inputImageUrls: item['Input Image Urls'],
            });
          }

          res.status(200).json({ requestId: request.id });
        } catch (dbError) {
          console.error('Error processing CSV data:', dbError);
          res.status(500).json({ error: 'Error processing CSV data' });
        }
      });
  } catch (error) {
    console.error('Error uploading CSV:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
