const express = require('express');
const routes = require('./routes');
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3001;

// Configure Sequelize with environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PW, {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
  }
);

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
