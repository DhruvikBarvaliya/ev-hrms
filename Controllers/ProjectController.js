const ProjectModel = require("../Models/ProjectModel");

module.exports = {
  addProject: async (req, res) => {
    try {
      const { leader_id,
        project_name,
        client_name,
        type_of_project,
        date_of_start,
        date_of_end,
        project_status,
        is_active,
        is_c2c,
        created_by,
        updated_by, } = req.body;

      const projectData = new ProjectModel({
        leader_id,
        project_name,
        client_name,
        type_of_project,
        date_of_start,
        date_of_end,
        project_status,
        is_active,
        is_c2c,
        created_by,
        updated_by,
      });
      projectData
        .save()
        .then((project) => {
          return res
            .status(201)
            .json({ status: true, message: "Project Created Successfully", project });
        })
        .catch((error) => {
          return res.status(400).json({ message: error.message, error: error });
        });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  getAllProject: async (req, res) => {
    try {
      const allProject = await ProjectModel.find()
      if (allProject.length == 0) {
        return res
          .status(404)
          .json({ status: false, message: `Project Not Found In Database` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Project Get Successfully", allProject });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  getProjectById: async (req, res) => {
    try {
      const { project_id } = req.params
      const project = await ProjectModel.findById({ _id: project_id });
      if (project == null) {
        return res
          .status(404)
          .json({ status: false, message: `Project Not Found With ID :- ${project_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Project Get Successfully", project });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  getProjectByLeaderId: async (req, res) => {
    try {
      const { id } = req.params

      const project = await ProjectModel.find({
        leader_id: id
      }).sort({ createdAt: 1 });

      if (project.length == 0) {
        return res
          .status(404)
          .json({ status: false, message: `Project Not Found ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Project Get Successfully", project });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  getProjectByName: async (req, res) => {
    try {
      const { project_name } = req.params

      const project = await ProjectModel.find({
        project_name: project_name
      }).sort({ createdAt: 1 });

      if (project.length == 0) {
        return res
          .status(404)
          .json({ status: false, message: `Project Not Found ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Project Get Successfully", project });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  getProjectByClientName: async (req, res) => {
    try {
      const { client_name } = req.params

      const project = await ProjectModel.find({
        client_name: client_name
      });


      if (project.length == 0) {
        return res
          .status(404)
          .json({ status: false, message: `Project Not Found ` });
      }

      return res
        .status(200)
        .json({ status: true, message: "Project Get Successfully", project });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  updateProject: async (req, res) => {
    try {
      const { project_id } = req.params
      const project = await ProjectModel.findByIdAndUpdate({ _id: project_id }, req.body, { new: true });
      if (project == null) {
        return res
          .status(404)
          .json({ status: false, message: `Project Not Found With ID :- ${project_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Project Updated Successfully", project });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  updateProjectStatus: async (req, res) => {
    try {
      const { project_id, status } = req.params
      const project = await ProjectModel.findByIdAndUpdate(project_id,
        { $set: { is_active: status } },
        { new: true });
      if (project == null) {
        return res
          .status(404)
          .json({ status: false, message: `Project Not Found With ID :- ${project_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Project Status Updated Successfully", project });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  deleteProject: async (req, res) => {
    try {
      const { project_id } = req.params
      const project = await ProjectModel.findByIdAndDelete({ _id: project_id });
      if (project == null) {
        return res
          .status(404)
          .json({ status: false, message: `Project Not Found With ID :- ${project_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: `Project Deleted Successfully with ID :- ${project._id}`});
    } catch (err) {
      return res
        .status(500)
            .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
};
