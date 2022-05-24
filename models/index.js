const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const User = require("./user");
const Book = require("./book");
const Plan = require("./plan");
const Record = require("./record");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;
db.Book = Book;
db.Plan = Plan;
db.Record = Record;

User.init(sequelize);
Book.init(sequelize);
Plan.init(sequelize);
Record.init(sequelize);

User.associate(db);
Book.associate(db);
Plan.associate(db);
Record.associate(db);

module.exports = db;
