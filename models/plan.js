const Sequelize = require("sequelize");

module.exports = class Plan extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        day: {
          type: Sequelize.STRING(3),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Plan",
        tableName: "plans",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Plan.belongsTo(db.User);
  }
};
