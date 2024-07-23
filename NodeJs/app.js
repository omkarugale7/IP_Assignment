const express = require('express');
const { sequelize } = require('./models');
const imageRoutes = require('./routes/imageRoutes');
const statusRoutes = require('./routes/statusRoutes');
const webhookRoutes = require('./routes/webhookRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

// Use the routes
app.use('/api/upload', imageRoutes); // Note: Use imageRoutes without additional '/upload'
app.use('/api/status', statusRoutes);
app.use('/api/webhook', webhookRoutes);

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // Ensure the database is in sync
    console.log('Database connected and synchronized');
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
