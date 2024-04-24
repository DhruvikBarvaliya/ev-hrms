const express = require("express");
const router = express.Router();
const authorize = require('../Middleware/auth');
const Role = require("../Helpers/role");
const LeaveController = require("../Controllers/LeaveController");

router.post("/leave", authorize([Role.ADMIN, Role.SUPER_ADMIN]), LeaveController.addLeave);
router.get("/leave", authorize([Role.ADMIN, Role.SUPER_ADMIN]), LeaveController.getAllLeave);
router.get("/leave/:leave_id", authorize(), LeaveController.getLeaveById);
router.get("/leave/employee/:employee_id", authorize(), LeaveController.getLeaveByEmployeeId);
router.get("/leave/status/:leave_status", authorize(), LeaveController.getLeaveByStatus);
router.get("/leave/:start_date/:end_date", authorize(), LeaveController.getLeaveByDate);
router.put("/leave/:leave_id", authorize([Role.ADMIN, Role.SUPER_ADMIN]), LeaveController.updateLeave);
router.patch("/leave/:leave_id/:is_active", authorize([Role.ADMIN, Role.SUPER_ADMIN]), LeaveController.updateLeaveStatus);
router.delete("/leave/:leave_id", authorize([Role.ADMIN, Role.SUPER_ADMIN]), LeaveController.deleteLeave);

module.exports = router;
