CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tabla de Clientes (usuario_id es TEXT para coincidir con usuario.id de tu equipo)
CREATE TABLE IF NOT EXISTS cliente (
    id SERIAL PRIMARY KEY,
    usuario_id TEXT NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
    telefono TEXT
);

-- 2. Tabla de Solicitudes de Trabajo (Closed-Loop)
-- profesional_id es TEXT para vincularse con profesional.id existente
CREATE TABLE IF NOT EXISTS solicitud_trabajo (
    id SERIAL PRIMARY KEY,
    cliente_id INT NOT NULL REFERENCES cliente(id) ON DELETE RESTRICT,
    profesional_id TEXT NOT NULL REFERENCES profesional(id) ON DELETE RESTRICT,
    servicio TEXT NOT NULL,
    estado TEXT DEFAULT 'FINALIZADO' CHECK (estado IN ('PENDIENTE', 'EN_PROGRESO', 'FINALIZADO', 'CANCELADO')),
    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabla de Reseñas / Calificaciones
CREATE TABLE IF NOT EXISTS resenia (
    id SERIAL PRIMARY KEY,
    solicitud_id INT NOT NULL UNIQUE REFERENCES solicitud_trabajo(id) ON DELETE RESTRICT,
    cliente_id INT NOT NULL REFERENCES cliente(id) ON DELETE RESTRICT,
    profesional_id TEXT NOT NULL REFERENCES profesional(id) ON DELETE RESTRICT,
    calificacion INT NOT NULL CHECK (calificacion >= 1 AND calificacion <= 5),
    comentario TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Semillas: Creamos al usuario Abril como CLIENTE (si no existe) y la vinculamos
INSERT INTO usuario (id, email, password_hash, nombre, apellido, rol)
VALUES (
    gen_random_uuid()::text,
    'abril.cliente@expertoya.com',
    'hash_seguro_password',
    'Abril',
    'Gavilán',
    'CLIENTE'::"Role"
)
ON CONFLICT (email) DO NOTHING;

-- Creamos el registro de Cliente
INSERT INTO cliente (usuario_id, telefono)
SELECT id, '+54 299 1234567'
FROM usuario 
WHERE email = 'abril.cliente@expertoya.com'
  AND NOT EXISTS (
    SELECT 1 FROM cliente c JOIN usuario u ON c.usuario_id = u.id WHERE u.email = 'abril.cliente@expertoya.com'
  );

-- Creamos una solicitud de trabajo finalizada vinculada a Carlos Plomero (ya existente en tu BD)
INSERT INTO solicitud_trabajo (cliente_id, profesional_id, servicio, estado)
SELECT 
    c.id, 
    p.id, 
    'Reparación de pérdida de agua en cocina', 
    'FINALIZADO'
FROM cliente c
JOIN usuario u ON c.usuario_id = u.id
JOIN profesional p ON p.id = (SELECT id FROM profesional LIMIT 1)
WHERE u.email = 'abril.cliente@expertoya.com'
  AND NOT EXISTS (
    SELECT 1 FROM solicitud_trabajo st WHERE st.cliente_id = c.id
  )
LIMIT 1;
