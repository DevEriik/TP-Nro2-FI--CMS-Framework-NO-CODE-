import { Resend } from "resend";
import dotenv from "dotenv";

// Necesario acá: los imports se ejecutan antes que el dotenv.config() de index.js
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export default resend;
