/**
 * MÓDULO: Gestión de Usuarios y Perfiles 
 * Registro de clientes/profesionales con encriptación de contraseñas
 * y consulta de perfiles profesionales**/

import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(express.json());

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
        if (!nombreCompleto || !email || !password || !rol) {
        return res.status(400).json({
            error:
            "Todos los campos obligatorios (nombreCompleto, email, password, rol) deben completarse.",
        });
        }
        const usuarioExistente = usuariosDB.find((u) => u.email === email);
        if (usuarioExistente) {
        return res.status(409).json({
            error: "El correo electrónico ya se encuentra registrado en ExpertoYa.",
        });
    }
    // Encriptación de contraseña mediante librería bcryptjs
    const salt = await bcrypt.genSalt(10);
    const passwordEncriptada = await bcrypt.hash(password, salt);
    const nuevoUsuario = {
        id: usuariosDB.length + 1,
        nombreCompleto,
        email,
        passwordHash: passwordEncriptada,
        rol, 
        oficio: rol === "profesional" ? oficio || "General" : null,
        zona: zona || "Alto Valle (Neuquén / Río Negro)",
        verificado: false,
        fechaRegistro: new Date().toISOString(),
    };
    usuariosDB.push(nuevoUsuario);
    // Generación de token local con jsonwebtoken (JWT)
    const token = jwt.sign(
        { id: nuevoUsuario.id, email: nuevoUsuario.email, rol: nuevoUsuario.rol },
        JWT_SECRET,
        { expiresIn: "2h" },
    );

    return res.status(201).json({
        mensaje: "Usuario registrado exitosamente en ExpertoYa.",
        usuario: {
            id: nuevoUsuario.id,
            nombreCompleto: nuevoUsuario.nombreCompleto,
            email: nuevoUsuario.email,
            rol: nuevoUsuario.rol,
            oficio: nuevoUsuario.oficio,
            zona: nuevoUsuario.zona,
            passwordHashMuestra: passwordEncriptada,
        },
        token,
    });
    } catch (error) {
        return res
        .status(500)
        .json({ error: "Error interno al registrar el usuario." });
    }
});



app.get("/api/usuarios/:id", (req, res) => {
    const idBuscado = parseInt(req.params.id, 10);
    const usuario = usuariosDB.find((u) => u.id === idBuscado);
    if (!usuario) {
        return res.status(404).json({
        error: `No se encontró ningún usuario o profesional con el ID ${idBuscado}.`,
        });
    }
    // Retornamos los datos del perfil ocultando la contraseña encriptada
    const { passwordHash, ...perfilPublico } = usuario;
    return res.status(200).json({
        mensaje: "Perfil recuperado exitosamente.",
        perfil: perfilPublico,
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(
        `✅ Servidor del Módulo de Usuarios corriendo en http://localhost:${PORT}`,
    );
});
