const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function encryptPassword(plainPassword, saltRounds = 10) {
  return bcrypt.hashSync(plainPassword, saltRounds);
}

function verifyPassword(plainPassword, hashedPassword) {
  return !!bcrypt.compareSync(plainPassword, hashedPassword);
}

function createJWT(obj) {
  return jwt.sign(obj, process.env.JWT_SECRET, {
    expiresIn: "1d",
    algorithm: "HS512",
  });
}

function verifyJWT(token) {
  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { status: true, data: decoded };
  } catch (e) {
    return { status: false, message: e.message };
  }
}

module.exports = {
  encryptPassword,
  verifyPassword,
  createJWT,
  verifyJWT,
};
