const jwt = require("jsonwebtoken");
require("dotenv").config();
function jwtGenerator(user) {
  const payload = {
    user_id: user.id,
    user_name: user.user_name,
  };
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "10hr" });
}
function getItem(token) {
  const decoded = jwt.verify(token, process.env.jwtSecret);
  return decoded;
}
module.exports = { jwtGenerator, getItem };
