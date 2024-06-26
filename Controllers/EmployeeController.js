const employeeModel = require("../Models/EmployeeModel");
const bcrypt = require("bcryptjs");
const { jwt_key } = require("../Config/Config");
const jsonwebtoken = require("jsonwebtoken");

module.exports = {
  addEmployee: async (req, res) => {
    try {
      const {
        role,
        first_name,
        middle_name,
        last_name,
        qulification,
        designation,
        reference_name,
        address,
        phone,
        email,
        gender,
        project_name,
        team_leader,
        date_of_birth,
        date_of_hire,
        paid_leave_available,
        seek_leave__available,
        marital_status,
        is_verified,
        status,
        is_active,
        created_by,
        updated_by,
      } = req.body;

      if (!first_name) {
        return res
          .status(400)
          .json({ status: false, message: "first_name is Required" });
      }
      if (!last_name) {
        return res
          .status(400)
          .json({ status: false, message: "last_name is Required" });
      }

      let full_name;

      if (middle_name) {
        full_name = `${first_name} ${middle_name} ${last_name}`;
      } else {
        full_name = `${first_name} ${last_name}`;
      }

      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);

      const user = await employeeModel.findOne({ email: email });

      if (user) {
        return res.status(400).json({ message: "User already registered" });
      } else {
        const userData = new employeeModel({
          role,
          first_name,
          middle_name,
          last_name,
          full_name: full_name,
          qulification,
          designation,
          reference_name,
          address,
          phone,
          email,
          password,
          gender,
          project_name,
          team_leader,
          date_of_birth,
          date_of_hire,
          paid_leave_available,
          seek_leave__available,
          marital_status,
          is_verified,
          status,
          is_active,
          created_by,
          updated_by,
        });
        userData
          .save()
          .then((data) => {
            return res
              .status(201)
              .json({ message: "User Created Successfully" });
          })
          .catch((error) => {
            return res.status(400).json({ message: error.message, error: error });
          });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  getAllEmployee: async (req, res) => {
    try {
      const limit = parseInt(req.query.limit || 10);
      const skip = parseInt(req.query.skip || 0)
      const allEmployee = await employeeModel.find().select("-password").limit(limit).skip(skip);
      const total = await employeeModel.find().count();
      if (allEmployee.length == 0) {
        return res
          .status(404)
          .json({ status: false, message: `Employee Not Found In Database` });
      }
      return res
        .status(200)
        .json({
          status: true, total, length: allEmployee.length, message: "Employee Get Successfully", allEmployee
        });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  getEmployeeById: async (req, res) => {
    try {
      const { employee_id } = req.params
      const employee = await employeeModel.findById({ _id: employee_id }).select("-password");
      if (employee == null) {
        return res
          .status(404)
          .json({ status: false, message: `Employee Not Found With ID :- ${employee_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Employee Get Successfully", employee });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  updateEmployee: async (req, res) => {
    try {
      const { employee_id } = req.params
      const { first_name, middle_name, last_name } =
        req.body;
      const employee_role = await employeeModel.findById({ _id: employee_id }, { role: 1 });
      if (employee_role == "EMPLOYEE") {
        delete req.body.role;
        delete req.body.password;
        delete req.body.is_active;
        delete req.body.is_verified;
      }
      let full_name = "";

      if (first_name && middle_name && last_name) {
        full_name = `${first_name} ${middle_name} ${last_name}`;
      } else if (first_name && middle_name) {
        full_name = `${first_name} ${middle_name}`;
      } else if (middle_name && last_name) {
        full_name = `${middle_name} ${last_name}`;
      } else if (first_name && last_name) {
        full_name = `${first_name} ${last_name}`;
      } else if (first_name) {
        full_name = first_name;
      } else if (middle_name) {
        full_name = middle_name;
      } else if (last_name) {
        full_name = last_name;
      }
      req.body.full_name = full_name;
      const employee = await employeeModel.findByIdAndUpdate({ _id: employee_id }, req.body, { new: true });
      if (employee == null) {
        return res
          .status(404)
          .json({ status: false, message: `Employee Not Found With ID :- ${employee_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Employee Updated Successfully", employee });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  updateEmployeeStatus: async (req, res) => {
    try {
      const { employee_id, is_active } = req.params
      const employee = await employeeModel.findByIdAndUpdate(employee_id,
        { $set: { is_active: is_active } },
        { new: true });
      if (employee == null) {
        return res
          .status(404)
          .json({ status: false, message: `Employee Not Found With ID :- ${employee_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Employee Status Updated Successfully", employee });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  deleteEmployee: async (req, res) => {
    try {
      const { employee_id } = req.params
      const employee = await employeeModel.findByIdAndDelete({ _id: employee_id });
      if (employee == null) {
        return res
          .status(404)
          .json({ status: false, message: `Employee Not Found With ID :- ${employee_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: `Employee Deleted Successfully with ID :- ${employee._id}` });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await employeeModel.findOne({ email: email });

      if (!user) {
        return res.status(404).json({ status: false, message: "User Not Found" });
      }
      if (user.is_active == false) {
        return res.status(404).json({ status: false, message: "User is Not Active" });
      }
      if (user.is_verified == false) {
        return res.status(404).json({ status: false, message: "User is Not verified" });
      }
      let pass = await bcrypt.compare(password, user.password);
      // if (!pass) {
      //   return res.status(404).json({ status: false, message: "Password is Incorect" });
      // }
      if (user.email == email && pass) {
        let token = jsonwebtoken.sign(
          { id: user._id, email: email, role: user.role },
          jwt_key, {
          expiresIn: '12h'
        }
        );
        return res.status(200).json({ email, token });
      } else {
        return res
          .status(401)
          .json({ status: false, message: "Please Provide Valid Email And Password" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },

  changePassword: async (req, res) => {
    try {
      const { email, password, newPassword } = req.body;
      const salt = await bcrypt.genSalt(10);
      const updatedPassword = await bcrypt.hash(newPassword, salt);
      const user = await employeeModel.findOne({ email: email });

      if (user.email == email && bcrypt.compare(password, user.password)) {
        const user = await employeeModel.findOneAndUpdate(
          { email },
          { $set: { password: updatedPassword } },
          { new: true }
        );
        return res
          .status(200)
          .json({
            status: true,
            message: `Password Updated Successfully For Email :- ${email} `,
          });
      } else {
        return res
          .status(401)
          .json({
            status: false,
            message: "Please Provide Valid Email And Password",
          });
      }
    } catch (err) {
      return res
        .status(500)
        .json({
          status: false,
          message: "Server Error",
          error: err.message || err.toString(),
        });
    }
  },
};
