require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User, Post, sequelize } = require("./db");
const { SIGNING_SECRET, SALT_COUNT, PORT } = process.env;
const port = PORT || 3000;

const app = express();

app.post("/register");

app.post("/login");

app.listen(port),
  () => {
    console.log(`Server is listening on localhost:£{port}`);
  };
