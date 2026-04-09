const sequelize = require("../config/database");

const Usuario = require("./Usuario");
const Tablero = require("./Tablero");
const Lista = require("./Lista");
const Tarjeta = require("./Tarjeta");

// Usuario -> Tablero
Usuario.hasMany(Tablero, {
  foreignKey: {
    name: "usuarioId",
    allowNull: false
  },
  as: "tableros",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

Tablero.belongsTo(Usuario, {
  foreignKey: "usuarioId",
  as: "usuario"
});

// Tablero -> Lista
Tablero.hasMany(Lista, {
  foreignKey: {
    name: "tableroId",
    allowNull: false
  },
  as: "listas",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

Lista.belongsTo(Tablero, {
  foreignKey: "tableroId",
  as: "tablero"
});

// Lista -> Tarjeta
Lista.hasMany(Tarjeta, {
  foreignKey: {
    name: "listaId",
    allowNull: false
  },
  as: "tarjetas",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

Tarjeta.belongsTo(Lista, {
  foreignKey: "listaId",
  as: "lista"
});

module.exports = {
  sequelize,
  Usuario,
  Tablero,
  Lista,
  Tarjeta
};