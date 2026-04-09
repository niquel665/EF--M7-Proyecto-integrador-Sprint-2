const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Tablero extends Model {}

Tablero.init(
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
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: "Tablero",
    tableName: "tableros",
    timestamps: true
  }
);

module.exports = Tablero;