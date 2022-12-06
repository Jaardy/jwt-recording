require("dotenv").config();
const express = require("express");
const { auth, requiresAuth } = require("express-openid-connect");
const { userScreen } = require("./middleware");

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
  res.send(req.oidc.user);
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

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
