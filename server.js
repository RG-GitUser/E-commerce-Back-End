const express = require('express');
const routes = require('./routes');
const { sequelize } = require('./config/connection');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Sync Sequelize models with the database
sequelize.sync()
  .then(() => {
    console.log('Database & tables synced');
  })
  .catch((err) => {
    console.error('Error syncing the database:', err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// Start the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});