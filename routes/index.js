const { Router } = require("express");
const Swagger = require("./swaggerRouter");
const Admin = require("./adminRouter.js");
const SuperAdmin = require("./superAdminRouter.js");
const Member = require("./memberRouter.js");
const Car = require("./carRouter.js");

const route = Router();

route.use("/api-docs", Swagger);
route.use("/api/v1/superadmin", SuperAdmin);
route.use("/api/v1/admins", Admin);
route.use("/api/v1/members", Member);
route.use("/api/v1/cars", Car);

module.exports = route;
