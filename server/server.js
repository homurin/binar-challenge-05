const dotenv = require("dotenv");
const process = require("process");
const app = require("../app.js");

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.info(`server listening at port: ${PORT}`);
});
