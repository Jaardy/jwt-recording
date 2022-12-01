require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User, Post, sequelize } = require("./db");
const { SIGNING_SECRET, SALT_COUNT, PORT } = process.env;
const { authScreen, authCheck } = require("./middleware");
const port = PORT || 3000;

const app = express();

app.use(express.json());
app.use(authScreen);
app.get("/", authCheck, (req, res) => {
  res.send(req.user);
});

app.get('/messages', async (req, res, next) => {
    const posts = await Post.findAll()
    res.status(200).send(posts)
})

app.get('/messages/:userId', async (req, res, next) => {
    const {userId} = req.params
    const posts = await Post.findAll({where: {userId: userId}})
    res.status(200).send(post)
})

app.post('/messages', authCheck, (req, res, next) => {
    const {}
})

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
