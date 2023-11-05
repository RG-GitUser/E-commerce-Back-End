const Sequelize  = require('sequelize');
require('dotenv').config();

// const sequelize = new Sequelize({
//   dialect: 'mysql',
//   host: 'localhost',
//   username: 'root',
//   password: 'UNBbootcamp!23',
//   database: 'ecommerce_db',
// });

// module.exports = { sequelize };


let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true
      }
    }
  );
}

module.exports = sequelize;

