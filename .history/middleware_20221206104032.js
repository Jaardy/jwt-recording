const { User } = require("./db");

exports.userScreen = async function (req, res, next) {
  if (!req.oidc.user) {
    console.log("no user logged in.");
    next();
    return;
  }
  const { nickname: username, email } = req.oidc.user;
  const [user, _isCreated] = await User.findOrCreate({ where: { username } });
  // req.oidc.user.id = user.id;
  next();
};