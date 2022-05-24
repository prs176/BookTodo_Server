const Sequelize = require("sequelize");

module.exports = class Book extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        isbn: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        progress: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Book",
        tableName: "books",
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Book.belongsTo(db.User);
  }
};
