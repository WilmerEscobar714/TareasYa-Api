import { Router } from 'express';
import {
    listarTareas,
    obtenerTarea,
    crearTarea,
    actualizarTarea,
    eliminarTarea,
    tareasPorUsuario,
    tareasPorCategoria,
    tareasPendientes,
    tareasCompletadas,
    tareasPorPrioridad,
    tareasVencidas
} from '../controllers/tareas.controller';

const router: Router = Router();

// CRUD básico
router.get('/', listarTareas);
router.get('/:id', obtenerTarea);
router.post('/', crearTarea);
router.put('/:id', actualizarTarea);
router.delete('/:id', eliminarTarea);

// Consultas específicas
router.get('/usuario/:idUsuario', tareasPorUsuario);
router.get('/categoria/:idCategoria', tareasPorCategoria);
router.get('/estado/pendientes', tareasPendientes);
router.get('/estado/completadas', tareasCompletadas);
router.get('/prioridad/:prioridad', tareasPorPrioridad);
router.get('/vencidas', tareasVencidas);

export default router;