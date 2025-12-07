import { Router } from 'express';  
import { listarCategorias } from '../controllers/categorias.controller';

const router: Router = Router();

router.get('/', listarCategorias);

export default router;

