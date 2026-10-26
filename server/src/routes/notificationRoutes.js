import express from "express";
import { sendWelcomeEmail } from "../controllers/notificationController.js";

const router = express.Router();

router.post("/welcome", sendWelcomeEmail);

export default router;
