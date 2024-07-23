const { Request } = require('../models');

const getStatus = async (req, res) => {
  const { requestId } = req.params;
  const request = await Request.findByPk(requestId);
  if (!request) {
    return res.status(404).json({ error: 'Request not found' });
  }
  res.json({ status: request.status });
};

module.exports = {
  getStatus,
};
