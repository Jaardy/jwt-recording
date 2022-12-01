const jwt = require("jsonwebtoken");
const secret =
  "This is a secret, that should really be hidden in the .env file.";
const payload = { username: "Fozzie", email: "fozzie@gmail.com", uid: 1 };

const token = jwt.sign(payload, secret);
console.log(token);

const userData = jwt.verify(token, secret);
console.log(userData);
