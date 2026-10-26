import resend from "../config/mailer.js";

const esc = (t = "") =>
    String(t).replace(
        /[&<>"']/g,
        (c) =>
        ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
            c
        ],
    );

const primerNombre = (n = "") => String(n).trim().split(" ")[0];
const urlFront = () => process.env.FRONTEND_URL || "http://localhost:5173";


const fila = (icono, html) => `
    <tr>
        <td style="vertical-align:top;padding:8px 12px 8px 0;font-size:18px;">${icono}</td>
        <td style="vertical-align:top;padding:8px 0;font-size:15px;line-height:1.5;color:#334155;">${html}</td>
    </tr>`;

    const caja = (filas) => `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
        style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;margin:24px 0;">
        <tr><td style="padding:12px 20px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${filas}</table>
        </td></tr>
    </table>`;

    const layout = ({
    badge,
    titulo,
    intro,
    cajaHtml = "",
    botonTexto,
    botonUrl,
    }) => `
    <div style="background:#ffffff;padding:16px 8px;font-family:'Segoe UI',Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;">
        <tr><td style="padding:12px 8px 20px 8px;border-bottom:1px solid #f1f5f9;">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td style="background:#FF8C00;border-radius:8px;width:36px;height:36px;text-align:center;color:#ffffff;font-weight:800;font-size:20px;">E</td>
            <td style="padding-left:10px;font-size:22px;font-weight:800;">
            <span style="color:#FF8C00;">Experto</span><span style="color:#1E293B;">Ya!</span>
            </td>
        </tr></table>
        </td></tr>
        <tr><td style="padding:28px 8px 8px 8px;">
        <span style="display:inline-block;background:#ecfdf5;border:1px solid #a7f3d0;color:#047857;font-size:12px;font-weight:700;padding:6px 14px;border-radius:999px;">${badge}</span>
        <h1 style="margin:18px 0 12px 0;font-size:30px;line-height:1.2;color:#1E293B;font-weight:800;">${titulo}</h1>
        <p style="margin:0;font-size:16px;line-height:1.6;color:#475569;">${intro}</p>
        ${cajaHtml}
        <div style="text-align:center;margin:28px 0 12px 0;">
            <a href="${botonUrl}" style="display:inline-block;background:#FF8C00;color:#ffffff;font-weight:700;font-size:16px;padding:14px 36px;border-radius:12px;text-decoration:none;">${botonTexto}</a>
        </div>
        </td></tr>
        <tr><td style="padding:16px 8px;text-align:center;font-size:12px;color:#94a3b8;border-top:1px solid #f1f5f9;">
        Correo automático, por favor no respondas a esta dirección.
        </td></tr>
    </table>
    </div>`;

    // envio

    async function enviar({ para, asunto, html }) {
    const destino = process.env.EMAIL_DESTINO_PRUEBA || para;
    if (!destino) {
        console.warn("⚠️ Notificación sin destinatario, no se envió:", asunto);
        return;
    }
    const { data, error } = await resend.emails.send({
        from: "ExpertoYa <onboarding@resend.dev>",
        to: destino,
        subject: asunto,
        html,
    });
    if (error) console.error("⚠️ Falló el envío:", asunto, error);
    else console.log("📬 Notificación enviada:", asunto, data?.id);
    }


    export function notificarBienvenida({
    email,
    nombreCompleto,
    rol,
    oficio,
    zona,
    }) {
    const filas =
        fila(
        "🔍",
        "<strong>Para quienes necesitan arreglos:</strong> Encuentra profesionales certificados en plomería, electricidad, gas o carpintería con pagos resguardados y ubicación cercana.",
        ) +
        fila(
        "🛠️",
        "<strong>Para profesionales y expertos:</strong> Valida tu matrícula, publica tus trabajos con ayuda de nuestra IA y administra solicitudes de forma transparente.",
        ) +
        (rol === "profesional"
        ? fila(
            "📍",
            `Tu perfil de <strong>${esc(oficio || "profesional")}</strong> quedó activo en <strong>${esc(zona || "Neuquén y alrededores")}</strong>.`,
            )
        : "");

    return enviar({
        para: email,
        asunto: `¡Bienvenido a ExpertoYa, ${primerNombre(nombreCompleto)}!`,
        html: layout({
        badge: "✨ Comunidad de Confianza y Calidad",
        titulo: `¡Hola ${esc(primerNombre(nombreCompleto))}!<br>Tu cuenta ya está lista.`,
        intro:
            "Te damos la bienvenida a <strong>ExpertoYa!</strong>, la solución ágil y segura para conectar con los mejores oficios para tu hogar, o para impulsar tu trabajo ofreciendo tus servicios a clientes de tu zona.",
        cajaHtml: caja(filas),
        botonTexto: "Ingresar a la Plataforma",
        botonUrl: urlFront(),
        }),
    });
    }

    export function notificarNuevaResena({
    emailProfesional,
    nombreProfesional,
    nombreCliente,
    estrellas,
    comentario,
    }) {
    const n = Math.min(5, Math.max(0, Number(estrellas) || 0));
    const filas =
        fila(
        "⭐",
        `<span style="color:#FF8C00;font-size:20px;letter-spacing:2px;">${"★".repeat(n)}${"☆".repeat(5 - n)}</span> <strong>${n} de 5 estrellas</strong>`,
        ) + fila("💬", `<em>"${esc(comentario || "Sin comentario")}"</em>`);

    return enviar({
        para: emailProfesional,
        asunto: `Recibiste una nueva reseña de ${n} estrellas`,
        html: layout({
        badge: "⭐ Nueva reseña recibida",
        titulo: `¡Hola ${esc(primerNombre(nombreProfesional))}!<br>Un cliente te calificó.`,
        intro: `<strong>${esc(nombreCliente || "Un cliente")}</strong> dejó una opinión sobre el trabajo que realizaste. Las buenas reseñas te ayudan a conseguir más clientes en tu zona.`,
        cajaHtml: caja(filas),
        botonTexto: "Ver mis reseñas",
        botonUrl: `${urlFront()}/#resenas`,
        }),
    });
    }

    export function notificarNuevaCotizacion({
    emailProfesional,
    nombreProfesional,
    nombreCliente,
    oficio,
    descripcion,
    }) {
    const filas =
        fila("👤", `<strong>Cliente:</strong> ${esc(nombreCliente)}`) +
        fila("🛠️", `<strong>Oficio requerido:</strong> ${esc(oficio)}`) +
        fila(
        "📝",
        `<strong>Descripción del problema:</strong> ${esc(descripcion)}`,
        );

    return enviar({
        para: emailProfesional,
        asunto: `Nueva solicitud de presupuesto de ${nombreCliente}`,
        html: layout({
        badge: "📋 Nueva solicitud de presupuesto",
        titulo: `¡Hola ${esc(primerNombre(nombreProfesional))}!<br>Tenés una nueva solicitud.`,
        intro:
            "Un cliente quiere coordinar una visita técnica sin cargo de presupuesto. Respondé a la brevedad para quedarte con el trabajo.",
        cajaHtml: caja(filas),
        botonTexto: "Ver la solicitud",
        botonUrl: `${urlFront()}/#cotizacion`,
        }),
    });
}
