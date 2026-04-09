const sequelize = require("./config/database");

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a Neon/PostgreSQL establecida correctamente.");
  } catch (error) {
    console.error("❌ Error al conectar:", error.message);
  } finally {
    await sequelize.close();
  }
}

testConnection();