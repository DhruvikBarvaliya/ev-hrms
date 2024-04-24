const express = require("express");
const router = express.Router();
const authorize = require('../Middleware/auth');
const Role = require("../Helpers/role");
const EmployeeController = require("../Controllers/EmployeeController");

router.post("/employee", authorize([Role.ADMIN, Role.SUPER_ADMIN]), EmployeeController.addEmployee);
router.get("/employee", authorize([Role.ADMIN, Role.SUPER_ADMIN]), EmployeeController.getAllEmployee);
router.get("/employee/:employee_id", authorize([Role.ADMIN, Role.SUPER_ADMIN, Role.EMPLOYEE]), EmployeeController.getEmployeeById);
router.put("/employee/:employee_id", authorize([Role.ADMIN, Role.SUPER_ADMIN, Role.EMPLOYEE]), EmployeeController.updateEmployee);
router.put("/employee/:employee_id/:is_active", authorize([Role.ADMIN, Role.SUPER_ADMIN]), EmployeeController.updateEmployeeStatus);
router.delete("/employee/:employee_id", authorize([Role.ADMIN, Role.SUPER_ADMIN]), EmployeeController.deleteEmployee);
router.post("/login", EmployeeController.login);

module.exports = router;
