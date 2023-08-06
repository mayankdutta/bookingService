const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT | 3002,
  DB_SYNC: process.env.DB_SYNC | false,
};
