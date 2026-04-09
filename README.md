# EF--M7 Proyecto integrador Sprint 2  
## KanbanPro - Arquitectura de Datos y Capa de Persistencia

En este sprint se implementó la capa de persistencia del proyecto **KanbanPro** utilizando **PostgreSQL** con **Sequelize** como ORM.

La aplicación web del Sprint 1 se mantiene funcionando de forma desacoplada, renderizando la interfaz con **Express + Handlebars** y utilizando `data.json` como fuente para la vista del dashboard.  
La lógica nueva de base de datos se desarrolla y prueba de forma aislada mediante scripts ejecutados con Node.js.

---

## Objetivo del Sprint

Construir la arquitectura de datos del proyecto y validar su funcionamiento mediante:

- Definición de modelos con Sequelize
- Relaciones entre entidades
- Creación automática de tablas
- Poblamiento con datos de prueba
- Verificación de operaciones CRUD sin usar rutas de Express

---

## Tecnologías utilizadas

- Node.js
- Express
- Handlebars (hbs)
- PostgreSQL
- Sequelize
- Neon (PostgreSQL cloud)
- dotenv
- pg
- pg-hstore
- JSON local para la UI del Sprint 1

---

## Modelos implementados

Se crearon los siguientes modelos dentro de la carpeta `models/`:

- `Usuario`
- `Tablero`
- `Lista`
- `Tarjeta`

### Relaciones definidas

- Un **Usuario** tiene muchos **Tableros**
- Un **Tablero** tiene muchas **Listas**
- Una **Lista** tiene muchas **Tarjetas**

---

## Funcionalidades implementadas en Sprint 2

### 1. Conexión a la base de datos
Se configuró una conexión exitosa a PostgreSQL usando Sequelize y variables de entorno.

### 2. Creación de tablas con Sequelize
Se utiliza `sequelize.sync()` para generar las tablas a partir de los modelos.

### 3. Script de carga de datos
El archivo `seed.js` crea la estructura y carga datos de prueba en la base de datos.

Datos cargados:
- 2 usuarios
- 3 tableros
- 7 listas
- 7 tarjetas

### 4. Script de pruebas CRUD
El archivo `test-crud.js` demuestra:

- **Crear:** nueva tarjeta asociada a una lista existente
- **Leer:** tablero con listas y tarjetas asociadas usando `include`
- **Actualizar:** cambio de título en una tarjeta
- **Borrar:** eliminación de la tarjeta creada en la prueba

---

## Estructura del proyecto

```text
config/
  database.js

models/
  Usuario.js
  Tablero.js
  Lista.js
  Tarjeta.js
  index.js

public/
  styles.css

views/
  home.hbs
  login.hbs
  register.hbs
  dashboard.hbs
  partials/
    layout.hbs

app.js
data.json
seed.js
test-connection.js
test-crud.js
package.json
README.md
