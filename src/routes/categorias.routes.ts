import { Router } from 'express';  
import { 
    listarCategorias, 
    listarCategoriasPorUsuario,
    crearCategoria,
    eliminarCategoria 
} from '../controllers/categorias.controller';

const router: Router = Router();

//Listar todas las categorías
router.get('/', listarCategorias);

//Listar categorías por usuario
router.get('/usuario/:idUsuario', listarCategoriasPorUsuario);

//Crear nueva categoría
router.post('/crear', crearCategoria);

//Eliminar categoría (borrado lógico)
router.delete('/:idCategoria', eliminarCategoria);

export default router;