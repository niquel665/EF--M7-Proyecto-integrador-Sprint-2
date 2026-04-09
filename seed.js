const { sequelize, Usuario, Tablero, Lista, Tarjeta } = require("./models");

async function seed() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión exitosa.");

    await sequelize.sync({ force: true });
    console.log("✅ Tablas creadas correctamente con sequelize.sync().");

    const usuarios = await Usuario.bulkCreate(
      [
        {
          nombre: "Nicole Urquiza",
          email: "nicole@kanbanpro.com",
          password: "123456"
        },
        {
          nombre: "David PM",
          email: "david@kanbanpro.com",
          password: "123456"
        }
      ],
      { returning: true }
    );

    const [usuario1, usuario2] = usuarios;

    const tableros = await Tablero.bulkCreate(
      [
        {
          titulo: "KanbanPro - Desarrollo",
          descripcion: "Tablero principal del producto",
          usuarioId: usuario1.id
        },
        {
          titulo: "KanbanPro - Marketing",
          descripcion: "Campañas y comunicaciones",
          usuarioId: usuario1.id
        },
        {
          titulo: "Proyecto Personal",
          descripcion: "Tareas personales del usuario",
          usuarioId: usuario2.id
        }
      ],
      { returning: true }
    );

    const [tablero1, tablero2, tablero3] = tableros;

    const listas = await Lista.bulkCreate(
      [
        { titulo: "Por hacer", posicion: 1, tableroId: tablero1.id },
        { titulo: "En progreso", posicion: 2, tableroId: tablero1.id },
        { titulo: "Hecho", posicion: 3, tableroId: tablero1.id },

        { titulo: "Ideas", posicion: 1, tableroId: tablero2.id },
        { titulo: "Publicando", posicion: 2, tableroId: tablero2.id },

        { titulo: "Pendientes", posicion: 1, tableroId: tablero3.id },
        { titulo: "Completadas", posicion: 2, tableroId: tablero3.id }
      ],
      { returning: true }
    );

    const [lista1, lista2, lista3, lista4, lista5, lista6, lista7] = listas;

    await Tarjeta.bulkCreate([
      {
        titulo: "Diseñar modelo de datos",
        descripcion: "Definir entidades y relaciones",
        estado: "pendiente",
        prioridad: "alta",
        listaId: lista1.id
      },
      {
        titulo: "Configurar Sequelize",
        descripcion: "Instalar y conectar ORM con PostgreSQL",
        estado: "en_progreso",
        prioridad: "alta",
        listaId: lista2.id
      },
      {
        titulo: "Crear scripts de prueba",
        descripcion: "Validar CRUD desde Node.js",
        estado: "completada",
        prioridad: "media",
        listaId: lista3.id
      },
      {
        titulo: "Definir campaña de lanzamiento",
        descripcion: "Ideas para promoción",
        estado: "pendiente",
        prioridad: "media",
        listaId: lista4.id
      },
      {
        titulo: "Programar publicaciones",
        descripcion: "Calendario de RRSS",
        estado: "en_progreso",
        prioridad: "baja",
        listaId: lista5.id
      },
      {
        titulo: "Estudiar Sequelize",
        descripcion: "Repasar modelos y asociaciones",
        estado: "pendiente",
        prioridad: "alta",
        listaId: lista6.id
      },
      {
        titulo: "Subir proyecto a GitHub",
        descripcion: "Publicar repositorio final",
        estado: "completada",
        prioridad: "media",
        listaId: lista7.id
      }
    ]);

    console.log("✅ Base de datos poblada con datos de ejemplo.");
    console.log("Usuarios creados:", await Usuario.count());
    console.log("Tableros creados:", await Tablero.count());
    console.log("Listas creadas:", await Lista.count());
    console.log("Tarjetas creadas:", await Tarjeta.count());
  } catch (error) {
    console.error("❌ Error al poblar la base de datos:", error);
  } finally {
    await sequelize.close();
  }
}

seed();