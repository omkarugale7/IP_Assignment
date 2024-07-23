const Queue = require('bull');
const imageProcessor = require('../workers/imageProcessor');

const imageQueue = new Queue('image-processing', 'redis://127.0.0.1:6379');

imageQueue.process(imageProcessor);

module.exports = imageQueue;
