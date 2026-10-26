import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import reseniaRoutes from "./routes/resenia.routes.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import notificationRoutes from "./routes/notificationRoutes.js";
import resend from "./config/mailer.js";
import {
  notificarBienvenida,
  notificarNuevaCotizacion,
  notificarNuevaResena,
} from "./services/notificaciones.js"; 

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:5174", 
      "http://127.0.0.1:5174", 
    ],
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
    console.log("📩 Registro recibido:", req.body.email);

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

    notificarBienvenida({ email, nombreCompleto, rol, oficio, zona }).catch(
      (e) => console.error("Error enviando bienvenida:", e),
    );

    return res.status(201).json({ mensaje: "Usuario registrado." });
  } catch (error) {
    console.error("🚨 ERROR EN EL BACKEND:", error);
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

app.post("/api/cotizaciones", (req, res) => {
  const { nombreCompleto, oficio, descripcion, profesionalId } = req.body;
  if (!nombreCompleto || !oficio || !descripcion)
    return res.status(400).json({ error: "Faltan campos." });

  const profesional = usuariosDB.find(
    (u) =>
      u.rol === "profesional" &&
      (profesionalId
        ? u.id === Number(profesionalId)
        : u.oficio?.toLowerCase().includes(oficio.toLowerCase())),
  );

  notificarNuevaCotizacion({
    emailProfesional: profesional?.email,
    nombreProfesional: profesional?.nombreCompleto,
    nombreCliente: nombreCompleto,
    oficio,
    descripcion,
  }).catch((e) => console.error("Error notificando cotización:", e));

  return res.status(201).json({ mensaje: "Solicitud enviada." });
});

app.post("/api/notifications/resena", (req, res) => {
  const { profesionalNombre, clienteNombre, estrellas, comentario } = req.body;
  if (!estrellas)
    return res.status(400).json({ error: "Falta la calificación." });

  const profesional = usuariosDB.find(
    (u) => u.rol === "profesional" && u.nombreCompleto === profesionalNombre,
  );

  notificarNuevaResena({
    emailProfesional: profesional?.email,
    nombreProfesional: profesionalNombre,
    nombreCliente: clienteNombre,
    estrellas,
    comentario,
  }).catch((e) => console.error("Error notificando reseña:", e));

  return res.status(201).json({ mensaje: "Notificación enviada." });
});

app.use("/api/notifications", notificationRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor Unificado activo en http://localhost:${PORT}`);
});
