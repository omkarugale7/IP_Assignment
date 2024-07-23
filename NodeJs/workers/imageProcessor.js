const axios = require('axios');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { Product, Request } = require('../models');

const imageProcessor = async (job, done) => {
  const { requestId } = job.data;
  const products = await Product.findAll({ where: { requestId } });

  for (let product of products) {
    const inputImageUrls = product.inputImageUrls.split(',');
    const outputImageUrls = [];

    for (let url of inputImageUrls) {
      const imageResponse = await axios({ url, responseType: 'arraybuffer' });
      const imageBuffer = Buffer.from(imageResponse.data, 'binary');
      const outputBuffer = await sharp(imageBuffer).jpeg({ quality: 50 }).toBuffer();
      const outputPath = path.join(__dirname, '..', 'processed_images', `${uuidv4()}.jpg`);
      fs.writeFileSync(outputPath, outputBuffer);
      outputImageUrls.push(outputPath);
    }

    await Product.update({ outputImageUrls: outputImageUrls.join(',') }, { where: { id: product.id } });
  }

  await Request.update({ status: 'Completed' }, { where: { id: requestId } });
  axios.post('http://localhost:3000/webhook', { requestId });
  done();
};

module.exports = imageProcessor;
