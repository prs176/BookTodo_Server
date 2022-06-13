const Sequelize = require("sequelize");

module.exports = class Record extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        page: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        date: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Record",
        tableName: "records",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Record.belongsTo(db.User);
    db.Record.belongsTo(db.Book, {
      foreignKey: "isbn",
      targetKey: "isbn",
    });
  }
};
