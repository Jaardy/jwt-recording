require("dotenv").config();
const express = require("express");
const { auth, requiresAuth } = require("express-openid-connect");

const { User, Post, sequelize } = require("./db");
const { SIGNING_SECRET, SALT_COUNT, PORT } = process.env;
// const { authScreen } = require("./middleware");
const port = PORT || 3000;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: "a long, randomly-generated string stored in env",
  baseURL: "http://localhost:3000",
  clientID: "PBOB1j2oeTxDGzLkfhgTbVZXqzVFp5Pe",
  issuerBaseURL: "https://dev-r245jx53kv6mesql.eu.auth0.com",
};

const app = express();

app.use(express.json());
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
app.get("/test1", (req, res) => {
  res.send("Working!");
});
app.get("/test2", requiresAuth(), (req, res) => {
  res.send("Working!");
});
app.get("/messages", async (req, res, next) => {
  console.log(req.user.userId);
  const posts = await Post.findAll({ where: { userId: req.user.id } });
  res.status(200).send(posts);
});

app.post("/messages", async (req, res, next) => {
  const { post } = req.body;
  console.log(post);
  const user = await User.findByPk(req.user.id);
  const createdPost = await user.createPost({ message: post });
  res.status(200).send(createdPost);
});

app.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username: username } });
  if (user) {
    res.status(409).send("User already exists.");
    return;
  }
  const hashedPW = await bcrypt.hash(password, Number.parseInt(SALT_COUNT));
  const newUser = await User.create({ username: username, password: hashedPW });
  const token = jwt.sign({ username, id: newUser.id }, SIGNING_SECRET);
  res
    .status(200)
    .send({ message: `${username} account created and logged in.`, token });
});

app.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username: username } });
  if (!user) {
    res.status(401).send("User not found.");
    return;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    const token = jwt.sign({ username, id: user.id }, SIGNING_SECRET);
    res.status(200).send({ message: `${username} logged in.`, token });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
