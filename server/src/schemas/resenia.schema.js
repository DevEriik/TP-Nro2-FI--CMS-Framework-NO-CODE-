import { z } from 'zod';

export const createReseniaSchema = z.object({
    solicitud_id: z.number({
        required_error: "El ID de la solicitud es obligatorio",
        invalid_type_error: "El ID de la solicitud debe ser un número entero"
    }).int().positive(),

    cliente_id: z.number({
        required_error: "El ID del cliente es obligatorio",
        invalid_type_error: "El ID del cliente debe ser un número entero"
    }).int().positive(),

    profesional_id: z.union([
        z.string().min(1, "El ID del profesional es obligatorio"),
        z.number().int().positive()
    ]),

    calificacion: z.number({
        required_error: "La calificación es obligatoria",
        invalid_type_error: "La calificación debe ser un número"
    }).int().min(1, "La calificación mínima es 1 estrella").max(5, "La calificación máxima es 5 estrellas"),

    comentario: z.string({
        required_error: "El comentario es obligatorio"
    })
        .trim()
        .min(5, "El comentario debe tener al menos 5 caracteres")
        .max(500, "El comentario no puede exceder los 500 caracteres")
});
