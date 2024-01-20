const express = require("express");
const router = express.Router();
const authorize = require('../Middleware/auth');
const Role = require("../Helpers/role");
const ProjectController = require("../Controllers/ProjectController");


router.route('/project')
    .post(authorize([Role.ADMIN, Role.SUPER_ADMIN]), ProjectController.addProject)
    .get(authorize(), ProjectController.getAllProject);

router.route('/project/:project_id')
         .get(authorize(), ProjectController.getProjectById)
         .put(authorize(), ProjectController.updateProject)
         .delete(authorize(), ProjectController.deleteProject)

router.route('/project/leader/:id')
   .get(authorize([Role.ADMIN, Role.SUPER_ADMIN]), ProjectController.getProjectByLeaderId)

router.route('/project/name/:project_name')
  .get(authorize([Role.ADMIN, Role.SUPER_ADMIN]), ProjectController.getProjectByName)

router.route('/project/client/:client_name')
    .get(authorize([Role.ADMIN, Role.SUPER_ADMIN]), ProjectController.getProjectByClientName)


module.exports = router;
