const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SIGNING_SECRET } = process.env;

exports.authScreen = (req, res, next) => {
  let header = req.get("Authorization");
  if (!header) {
    next();
    return;
  }
  let [type, token] = header.split(" ");
  const user = jwt(token, SIGNING_SECRET);
  req.user = user;
  next();
};
