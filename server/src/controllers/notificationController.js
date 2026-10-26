import resend from "../config/mailer.js";

export const sendWelcomeEmail = async (req, res) => {
  const { email, nombre } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Falta el email" });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "ExpertoYa <onboarding@resend.dev>",
      to: [email],
      subject: "¡Bienvenido/a a ExpertoYa!",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #eee;border-radius:8px;overflow:hidden">
          <div style="background:#FF8C00;padding:24px;text-align:center">
            <h1 style="color:#fff;margin:0">ExpertoYa</h1>
          </div>
          <div style="padding:24px">
            <h2 style="color:#00BFA5">¡Hola ${nombre || ""}!</h2>
            <p>Tu cuenta fue creada con éxito. Ya podés encontrar profesionales de confianza en Neuquén.</p>
            <a href="http://localhost:5173" style="display:inline-block;background:#00BFA5;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none">Ir a ExpertoYa</a>
          </div>
        </div>`,
    });

    if (error) return res.status(400).json({ error });
    return res.status(200).json({ ok: true, data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
