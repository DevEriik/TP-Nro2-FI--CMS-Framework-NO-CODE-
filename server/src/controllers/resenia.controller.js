import { ReseniaModel } from '../models/resenia.model.js';
import { createReseniaSchema } from '../schemas/resenia.schema.js';

export const ReseniaController = {
    /**
     * POST /api/resenas
     * Crea una nueva calificación/reseña en el sistema
     */
    async create(req, res) {
        try {
            const validationResult = createReseniaSchema.safeParse(req.body);

            if (!validationResult.success) {
                return res.status(400).json({
                    error: "Datos de reseña inválidos",
                    detalles: validationResult.error.issues.map(issue => ({
                        campo: issue.path.join('.'),
                        mensaje: issue.message
                    }))
                });
            }

            const { solicitud_id, cliente_id, profesional_id, calificacion, comentario } = validationResult.data;

            const solicitud = await ReseniaModel.findSolicitudById(solicitud_id);

            if (!solicitud) {
                return res.status(404).json({
                    error: "Solicitud no encontrada",
                    mensaje: `No existe ninguna solicitud de trabajo con ID ${solicitud_id}.`
                });
            }

            if (solicitud.estado !== 'FINALIZADO') {
                return res.status(400).json({
                    error: "Acción no permitida",
                    mensaje: "Solo se pueden calificar solicitudes de trabajo que hayan sido FINALIZADAS."
                });
            }

            if (solicitud.cliente_id !== cliente_id || solicitud.profesional_id !== profesional_id) {
                return res.status(403).json({
                    error: "Inconsistencia de participantes",
                    mensaje: "Los identificadores del cliente o profesional no coinciden con la solicitud de trabajo."
                });
            }

            const nuevaResenia = await ReseniaModel.create({
                solicitud_id,
                cliente_id,
                profesional_id,
                calificacion,
                comentario
            });

            return res.status(201).json({
                mensaje: "Reseña registrada con éxito",
                data: nuevaResenia
            });

        } catch (error) {
            if (error.code === '23505') {
                return res.status(409).json({
                    error: "Reseña duplicada",
                    mensaje: "Esta solicitud de trabajo ya cuenta con una reseña registrada."
                });
            }

            console.error('Error al crear reseña:', error);
            return res.status(500).json({
                error: "Error interno del servidor",
                mensaje: "Ocurrió un problema al procesar la reseña en la base de datos."
            });
        }
    },

    /**
     * GET /api/resenas/profesional/:id
     * Obtiene todas las reseñas de un profesional y calcula su promedio
     */
    async getByProfesional(req, res) {
        try {
            const profesionalId = req.params.id ? String(req.params.id).trim() : '';

            if (!profesionalId) {
                return res.status(400).json({
                    error: "Identificador inválido",
                    mensaje: "El ID del profesional es obligatorio."
                });
            }

            const resultado = await ReseniaModel.getByProfesionalId(profesionalId);

            return res.status(200).json({
                profesional_id: profesionalId,
                promedio: resultado.promedio,
                total_resenas: resultado.total,
                resenas: resultado.resenas
            });
        } catch (error) {
            console.error('Error al obtener reseñas del profesional:', error);
            return res.status(500).json({
                error: "Error interno del servidor",
                mensaje: "No se pudieron recuperar las calificaciones del profesional."
            });
        }
    }
};
