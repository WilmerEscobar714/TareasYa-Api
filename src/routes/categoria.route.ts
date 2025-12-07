import { Router } from 'express';
import { 
    obtenerCategorias, 
    crearCategoria, 
    actualizarCategoria, 
    eliminarCategoria 
} from '../controllers/categoria.controller';

const router: Router = Router();

router.get('/usuario/:idUsuario', obtenerCategorias);
router.post('/', crearCategoria);
router.put('/:idCategoria', actualizarCategoria);
router.delete('/:idCategoria', eliminarCategoria);

export default router;