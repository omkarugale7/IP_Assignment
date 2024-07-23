const express = require('express');
const bodyParser = require('body-parser');
const { handleWebhook } = require('../controllers/webhookController');

const router = express.Router();

router.post('/', bodyParser.json(), handleWebhook);

module.exports = router;
