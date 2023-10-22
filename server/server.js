const dotenv = require("dotenv");
const process = require("process");
const app = require("../app.js");
const { sequelize } = require("../models/index.js");

async function checkPostgeseqlConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully");
  } catch (err) {
    console.log("Unable to connect to the database:");
  }
}

dotenv.config();

const PORT = process.env.PORT;

checkPostgeseqlConnection();

app.listen(PORT, () => {
  console.info(`server listening at port: ${PORT}`);
});
