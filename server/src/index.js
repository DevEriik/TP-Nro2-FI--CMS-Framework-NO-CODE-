import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import reseniaRoutes from "./routes/resenia.routes.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

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
  res
    .status(201)
    .json({ mensaje: "Servicio publicado con exito", data: nuevoServicio });
});

const JWT_SECRET = "expertoya_clave_secreta_local_2026";
const usuariosDB = [
  {
    id: 1,
    nombreCompleto: "Martín Benítez",
    email: "martin.benitez@expertoya.com",
    rol: "profesional",
    oficio: "Plomería y Gas",
    matricula: "MAT-8842-NQN",
    zona: "Neuquén Capital y alrededores",
    verificado: true,
    descripcion:
      "Reparaciones de cañerías, destapes integrales e instalación de artefactos certificados.",
  },
  {
    id: 2,
    nombreCompleto: "Clara Rossi",
    email: "clara.rossi@expertoya.com",
    rol: "profesional",
    oficio: "Electricidad Integral",
    matricula: "MAT-5190-RN",
    zona: "Cipolletti y Plottier",
    verificado: true,
    descripcion:
      "Montaje de tableros trifásicos, cableados domiciliarios y certificaciones de obra.",
  },
];

app.post("/api/usuarios/registro", async (req, res) => {
  try {
    const { nombreCompleto, email, password, rol, oficio, zona } = req.body;
    if (!nombreCompleto || !email || !password || !rol)
      return res.status(400).json({ error: "Faltan campos." });
    const salt = await bcrypt.genSalt(10);
    const passwordEncriptada = await bcrypt.hash(password, salt);
    const nuevoUsuario = {
      id: usuariosDB.length + 1,
      nombreCompleto,
      email,
      passwordHash: passwordEncriptada,
      rol,
    };
    usuariosDB.push(nuevoUsuario);
    return res.status(201).json({ mensaje: "Usuario registrado." });
  } catch (error) {
    return res.status(500).json({ error: "Error interno." });
  }
});

app.get("/api/usuarios/:id", (req, res) => {
  const usuario = usuariosDB.find((u) => u.id === parseInt(req.params.id, 10));
  if (!usuario) return res.status(404).json({ error: "No encontrado" });
  const { passwordHash, ...perfilPublico } = usuario;
  return res.status(200).json({ perfil: perfilPublico });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "online", plataforma: "ExpertoYa API Unificada" });
});

app.use("/api/resenas", reseniaRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor Unificado activo en http://localhost:${PORT}`);
});
