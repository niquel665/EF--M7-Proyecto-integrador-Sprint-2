const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Tarjeta extends Model {}

Tarjeta.init(
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
    },
    estado: {
      type: DataTypes.ENUM("pendiente", "en_progreso", "completada"),
      allowNull: false,
      defaultValue: "pendiente"
    },
    prioridad: {
      type: DataTypes.ENUM("baja", "media", "alta"),
      allowNull: false,
      defaultValue: "media"
    }
  },
  {
    sequelize,
    modelName: "Tarjeta",
    tableName: "tarjetas",
    timestamps: true
  }
);

module.exports = Tarjeta;