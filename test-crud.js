const { sequelize, Tablero, Lista, Tarjeta, Usuario } = require("./models");

async function testCrud() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión exitosa.");

    await sequelize.sync();
    console.log("✅ Modelos sincronizados.");

    // CREATE
    const listaExistente = await Lista.findOne();

    if (!listaExistente) {
      throw new Error("No existen listas. Ejecuta primero: npm run seed");
    }

    const nuevaTarjeta = await Tarjeta.create({
      titulo: "Nueva tarjeta de prueba",
      descripcion: "Creada desde test-crud.js",
      estado: "pendiente",
      prioridad: "alta",
      listaId: listaExistente.id
    });

    console.log("\n✅ CREATE");
    console.log("Tarjeta creada:", nuevaTarjeta.toJSON());

    // READ
    const tablero = await Tablero.findOne({
      include: [
        {
          model: Usuario,
          as: "usuario",
          attributes: ["id", "nombre", "email"]
        },
        {
          model: Lista,
          as: "listas",
          include: [
            {
              model: Tarjeta,
              as: "tarjetas"
            }
          ]
        }
      ]
    });

    console.log("\n✅ READ");
    console.log("Tablero con listas y tarjetas:");
    console.log(JSON.stringify(tablero.toJSON(), null, 2));

    // UPDATE
    await nuevaTarjeta.update({
      titulo: "Tarjeta actualizada desde test-crud.js"
    });

    console.log("\n✅ UPDATE");
    console.log("Tarjeta actualizada:", nuevaTarjeta.toJSON());

    // DELETE
    await nuevaTarjeta.destroy();

    const tarjetaEliminada = await Tarjeta.findByPk(nuevaTarjeta.id);

    console.log("\n✅ DELETE");
    if (!tarjetaEliminada) {
      console.log(`Tarjeta con ID ${nuevaTarjeta.id} eliminada correctamente.`);
    } else {
      console.log("La tarjeta no se eliminó.");
    }
  } catch (error) {
    console.error("❌ Error en pruebas CRUD:", error.message);
  } finally {
    await sequelize.close();
  }
}

testCrud();