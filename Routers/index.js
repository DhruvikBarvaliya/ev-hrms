const express = require("express");
const router = express.Router();
const AssetRoute = require("./AssetRoute");
const AuthRoute = require("./AuthRoute");
const EmployeeRoute = require("./EmployeeRoute");
const LeaveRoute = require("./LeaveRoute");
const ProjectRoute = require("./ProjectRoute");

router.get("/", (req, res) => {
  res.send(`Welcome To Hrms Portal With Version V1`);
});

router.use(
  "/api",
  AssetRoute,
  AuthRoute,
  EmployeeRoute,
  LeaveRoute,
  ProjectRoute,
);

module.exports = router;
