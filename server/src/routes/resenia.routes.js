import { Router } from 'express';
import { ReseniaController } from '../controllers/resenia.controller.js';

const router = Router();

router.post('/', ReseniaController.create);

router.get('/profesional/:id', ReseniaController.getByProfesional);

export default router;
