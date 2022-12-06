const { User } = require("./db");

exports.userScreen = async function (req, res, next) {
  const { nickname, email } = req.oidc.user;
};
