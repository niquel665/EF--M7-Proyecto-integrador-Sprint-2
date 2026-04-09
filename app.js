const path = require("path");
const fs = require("fs");
const express = require("express");
const hbs = require("hbs");

const app = express();
const PORT = process.env.PORT ?? 3000;

const VIEWS_DIR = path.join(__dirname, "views");
const DATA_PATH = path.join(__dirname, "data.json");

// hbs
app.set("view engine", "hbs");
app.set("views", VIEWS_DIR);
hbs.registerPartials(path.join(VIEWS_DIR, "partials"));

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// helpers
const readData = () => {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error al leer data.json:", error.message);
    return { boards: [] };
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error al escribir data.json:", error.message);
    return false;
  }
};

const makeCardId = () =>
  `c-${Date.now()}-${Math.random().toString(16).slice(2)}`;

// rutas
app.get("/", (req, res) => res.render("home"));

app.get("/register", (req, res) => {
  res.render("register", { values: {} });
});

app.post("/register", (req, res) => {
  const nombre = (req.body.nombre ?? "").trim();
  const email = (req.body.email ?? "").trim();
  const password = (req.body.password ?? "").trim();

  if (!nombre || !email || !password) {
    return res.status(400).render("register", {
      error: "Todos los campos son obligatorios.",
      values: { nombre, email }
    });
  }

  if (nombre.length < 3) {
    return res.status(400).render("register", {
      error: "El nombre debe tener al menos 3 caracteres.",
      values: { nombre, email }
    });
  }

  if (password.length < 6) {
    return res.status(400).render("register", {
      error: "La contraseña debe tener al menos 6 caracteres.",
      values: { nombre, email }
    });
  }

  return res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("login", { values: {} });
});

app.post("/login", (req, res) => {
  const email = (req.body.email ?? "").trim();
  const password = (req.body.password ?? "").trim();

  if (!email || !password) {
    return res.status(400).render("login", {
      error: "Debes completar email y contraseña.",
      values: { email }
    });
  }

  if (password.length < 6) {
    return res.status(400).render("login", {
      error: "La contraseña debe tener al menos 6 caracteres.",
      values: { email }
    });
  }

  return res.redirect("/dashboard");
});

app.get("/dashboard", (req, res) => {
  const data = readData();
  const user = { name: "Demo", isAdmin: true };
  res.render("dashboard", { ...data, user });
});

app.post("/nueva-tarjeta", (req, res) => {
  const title = (req.body.title ?? "").trim();
  const { boardId, listId } = req.body;

  if (!title) {
    return res.status(400).send("El título de la tarea es obligatorio.");
  }

  if (title.length < 3) {
    return res.status(400).send("El título debe tener al menos 3 caracteres.");
  }

  const data = readData();

  const board = data.boards.find((b) => b.id === boardId);
  const list = board?.lists.find((l) => l.id === listId);

  if (!board || !list) {
    return res.status(404).send("No se encontró la lista o el tablero.");
  }

  list.cards.push({ id: makeCardId(), title });

  const wasSaved = writeData(data);

  if (!wasSaved) {
    return res.status(500).send("Ocurrió un error al guardar la nueva tarea.");
  }

  res.redirect("/dashboard");
});

app.use((req, res) => res.status(404).send("404 - Not Found"));

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));