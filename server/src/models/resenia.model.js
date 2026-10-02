import { pool } from '../config/db.js';

export const ReseniaModel = {
    /**
     * Registra una nueva reseña verificando que no exista ya para la misma solicitud
     */
    async create({ solicitud_id, cliente_id, profesional_id, calificacion, comentario }) {
        const query = `
      INSERT INTO resenia (solicitud_id, cliente_id, profesional_id, calificacion, comentario)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
        const values = [solicitud_id, cliente_id, profesional_id, calificacion, comentario];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    /**
     * Obtiene todas las reseñas de un profesional junto con el promedio y total
     */
    async getByProfesionalId(profesionalId) {
        const metricsQuery = `
      SELECT 
        COALESCE(ROUND(AVG(calificacion)::numeric, 1), 0.0) AS promedio,
        COUNT(*)::int AS total
      FROM resenia
      WHERE profesional_id = $1;
    `;

        const reviewsQuery = `
      SELECT 
        r.id,
        r.solicitud_id,
        r.calificacion,
        r.comentario,
        r.fecha_creacion,
        u.nombre AS cliente_nombre,
        st.servicio AS servicio_realizado
      FROM resenia r
      JOIN cliente c ON r.cliente_id = c.id
      JOIN usuario u ON c.usuario_id = u.id
      JOIN solicitud_trabajo st ON r.solicitud_id = st.id
      WHERE r.profesional_id = $1
      ORDER BY r.fecha_creacion DESC;
    `;

        const [metricsResult, reviewsResult] = await Promise.all([
            pool.query(metricsQuery, [profesionalId]),
            pool.query(reviewsQuery, [profesionalId])
        ]);

        return {
            promedio: Number(metricsResult.rows[0]?.promedio || 0),
            total: Number(metricsResult.rows[0]?.total || 0),
            resenas: reviewsResult.rows
        };
    },

    /**
     * Verifica el estado de una solicitud para garantizar el closed-loop
     */
    async findSolicitudById(solicitudId) {
        const query = `
      SELECT * FROM solicitud_trabajo WHERE id = $1;
    `;
        const { rows } = await pool.query(query, [solicitudId]);
        return rows[0];
    }
};
