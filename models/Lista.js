const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Lista extends Model {}

Lista.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    posicion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    sequelize,
    modelName: "Lista",
    tableName: "listas",
    timestamps: true
  }
);

module.exports = Lista;