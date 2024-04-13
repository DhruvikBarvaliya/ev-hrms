const express = require("express");
const router = express.Router();
const AssetRoute = require("./AssetRoute");
const AuthRoute = require("./AuthRoute");
const EmployeeRoute = require("./EmployeeRoute");
const LeaveRoute = require("./LeaveRoute");
const ProjectRoute = require("./ProjectRoute");

router.get("/", (req, res) => {
  res.send(`Welcome To Evenmore Hrms Portal For Leave,Asset and Project Management`);
});

router.use(
  "/api",
  //AssetRoute,
  //AuthRoute,
  EmployeeRoute,
  LeaveRoute,
  //ProjectRoute,
);

module.exports = router;
