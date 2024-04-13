const { jwt_key } = require("../Config/Config");
const employeeModel = require("../Models/EmployeeModel");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    try {
      const {
        email,
      } = req.body;

      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);

      const user = await employeeModel.findOne({ email: email });

      if (user) {
        return res.status(400).json({ status: false, message: "User already registered" });
      } else {
        const userData = new employeeModel({
          email,
          password,
        });
        userData
          .save()
          .then((data) => {
            return res
              .status(201)
              .json({ status: true, message: "User created Successfully", data });
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
      const { email, password, newPassword } = req.body
      const salt = await bcrypt.genSalt(10);
      const updatedPassword = await bcrypt.hash(newPassword, salt);
      const user = await employeeModel.findOne({ email: email });

      if (user.email == email && bcrypt.compare(password, user.password)) {
        const employee = await employeeModel.findOneAndUpdate(email,
          { $set: { password: updatedPassword } },
          { new: true });
        return res
          .status(200)
          .json({ status: true, message: `Password Updated Successfully For Email :- ${email} ` });
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
};
