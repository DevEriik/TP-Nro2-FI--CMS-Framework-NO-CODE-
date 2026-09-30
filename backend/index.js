const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let servicios = [
  {
    id: 1,
    categoria: "Plomeria",
    descrpcion: "Reparacion de cañerías",
    profesional: "Juan Perez",
    precio: 5000,
  },
];

app.get("/api/servicios", (req, res) => {
  res.json({
    mensaje: "Lista de servicios obtenida con exito",
    data: servicios,
  });
});

app.post("/api/servicios", (req, res) => {
  const nuevoServicio = req.body;

  nuevoServicio.id = servicios.length + 1;
  servicios.push(nuevoServicio);

  res.status(201).json({
    mensaje: "Servicio publicado con exito",
    data: nuevoServicio,
  });
});

app.listen(PORT, () => {
  console.log(`Modulo 1 (Servicios) corriendo en http://localhost:${PORT}`);
});
