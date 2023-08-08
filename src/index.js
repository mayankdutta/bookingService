const express = require("express");
const bodyParser = require("body-parser");
const { PORT, DB_SYNC } = require("./config/configServer.js");
const apiRoutes = require("./routes/");
const db = require("./models/");

const app = express();

async function setupAndStartServer() {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  app.listen(PORT, () => {
    console.log(`server is listentning @port = ${PORT}`); 
    if (DB_SYNC) {
      console.log('performing DB_SYNC')
      db.sequelize.sync({ alter: true });
    }
  });
}

setupAndStartServer();
