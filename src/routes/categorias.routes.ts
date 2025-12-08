import { Router } from 'express';  
import { listarCategorias, listarCategoriasPorUsuario } from '../controllers/categorias.controller';

const router: Router = Router();

router.get('/', listarCategorias);
router.get('/usuario/:idUsuario', listarCategoriasPorUsuario);

export default router;