const { User } = require("./db");

exports.userScreen = async function (req, res, next) {
  if (!req.oidc.user) {
    next();
    return;
  }
  const { nickname: username, email } = req.oidc.user;
  const [user, _isCreated] = await User.findOrCreate({
    where: { username, email },
  });
  req.oidc.user.id = user.id;
  console.log(typeof req.oidc);
  next();
};
