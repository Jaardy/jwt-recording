"use strict";

const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const {
  userData,
  messageDataAnimal,
  messageDataFozzie,
  messageDataSwedishChef,
} = require("./seedData");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "db.sqlite"),
  logging: false,
});

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Post = sequelize.define("Post", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Message, { foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId" });

async function main() {
  await sequelize.sync({ force: true });
  const users = await User.bulkCreate(userData);
  await Promise.all(messageDataFozzie.map((x) => users[0].createPost(x)));
  await Promise.all(messageDataSwedishChef.map((x) => users[1].createPost(x)));
  await Promise.all(messageDataAnimal.map((x) => users[2].createPost(x)));
}
main();

module.exports = { User, Post, sequelize };
