# 👤 Documentación Técnica: Módulo de Gestión de Usuarios y Perfiles

**Responsable:** Daniela Oñatibia (`feature/dani`)  
**Dominio:** ExpertoYa — Plataforma de contratación de servicios y oficios profesionales.

---

## 1. Descripción y Características del Módulo

El **Módulo de Gestión de Usuarios y Perfiles** administra el registro, la seguridad de credenciales y la consulta de perfiles dentro de **ExpertoYa**. Permite dar de alta a los dos roles principales del dominio —**Clientes solicitantes** y **Profesionales prestadores de oficios**— y visualizar la información pública de cada prestador (oficio, matrícula profesional y zona de cobertura en Neuquén, Cipolletti y Plottier).

### Cumplimiento de Pautas (Sin Interoperabilidad Externa)
Respetando la restricción del Trabajo Práctico N°2, el módulo se implementó de forma **100% local y autónoma**, sin integrar servicios de autenticación de terceros (como Google OAuth o Auth0). El cifrado de contraseñas y la generación de tokens de sesión se resuelven íntegramente dentro del servidor propio en Express.js.

---

## 2. Funcionalidades y Endpoints Implementados

El módulo expone dos *endpoints* REST en **`backend/moduloUsuarios.js`** y su interfaz interactiva en **`src/components/moduloUsuarios.tsx`**:

1. **`POST /api/usuarios/registro` (Registro Seguro de Usuarios):**
   * Recibe y valida los campos `nombreCompleto`, `email`, `password`, `rol`, `oficio` y `zona`.
   * Verifica que el correo electrónico no esté duplicado en el sistema (`HTTP 409 Conflict`).
   * Encripta la contraseña mediante *hashing* unidireccional con *Salt* antes de almacenarla.
   * Emite un token JWT local con expiración de 2 horas y retorna el perfil creado (`HTTP 201 Created`).

2. **`GET /api/usuarios/:id` (Consulta de Perfil por ID):**
   * Busca al usuario o profesional por su identificador único (`:id`).
   * Omite los datos sensibles (como el *hash* de la contraseña) y devuelve únicamente la ficha pública del perfil (`HTTP 200 OK`) o informa si no existe (`HTTP 404 Not Found`).

---

## 3. Librerías, Plugins y Componentes Utilizados

| Librería / Recurso | Capa | Propósito y Función en el Módulo |
| :--- | :--- | :--- |
| **`express`** | Backend | Framework principal para definir las rutas `POST` y `GET`, procesar JSON (`express.json()`) y gestionar respuestas HTTP. |
| **`bcryptjs`** | Backend (Seguridad) | Librería criptográfica empleada para encriptar las contraseñas (`bcrypt.genSalt(10)` y `bcrypt.hash()`), evitando guardar claves en texto plano. |
| **`jsonwebtoken` (JWT)** | Backend (Sesiones) | Librería utilizada para firmar tokens de sesión locales (`jwt.sign()`), resolviendo la autenticación sin depender de sistemas externos. |
| **`cors`** | Backend (Middleware) | Habilita la comunicación local entre el servidor Express y el cliente en React/Vite. |
| **`Shadcn/ui + Radix UI`** | Frontend (UI) | Componentes accesibles (`Card`, `Input`, `Label`, `Button`) estilizados con **Tailwind CSS** para el formulario de registro y el visor de perfiles. |