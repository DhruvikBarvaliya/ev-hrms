const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
  jwt_key: process.env.JWT_SECRET_KEY,
  env: process.env.ENV,
};
