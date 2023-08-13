const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT | 3002,
  DB_SYNC: process.env.DB_SYNC | false,
  FLIGHT_SERVICE_PATH: "http://localhost:3000",

  EXCHANGE_NAME: "AIRLINE_BOOKING",
  REMINDER_BINDING_KEY: "REMINDER_SERVICE",
  MESSAGE_BROKER_URL: "amqp://localhost",
  QUEUE_NAME: "REMINDER_QUEUE"

};
