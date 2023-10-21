const { Router } = require("express");
const swaggerUI = require("swagger-ui-express");
const YAML = require("js-yaml");
const fs = require("fs");

const swaggerDocument = YAML.load(
  fs.readFileSync("./docs/openapi-docs.yaml", "utf-8")
);
const route = Router();

route.use("/", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

module.exports = route;
