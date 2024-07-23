const { Request } = require('../models');

const handleWebhook = async (req, res) => {
  const { requestId } = req.body;
  await Request.update({ status: 'Completed' }, { where: { id: requestId } });
  res.json({ message: 'Status updated to Completed' });
};

module.exports = {
  handleWebhook,
};
