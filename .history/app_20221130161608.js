require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User, Post, sequelize } = require("./db");
const { SIGNING_SECRET, SALT_COUNT, PORT } = process.env;
const port = PORT || 3000;

const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("ok");
});

app.post("/register", (req, res, next) => {});

app.post("/login");

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});