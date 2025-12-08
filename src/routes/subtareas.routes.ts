import { Router } from 'express';
import {
    listarSubtareas,
    obtenerSubtarea,
    crearSubtarea,
    actualizarSubtarea,
    eliminarSubtarea,
    subtareasPorTarea,
    subtareasPendientes,
    subtareasCompletadas,
    cambiarEstado,
    eliminarPorTarea
} from '../controllers/subtareas.controller';

const router: Router = Router();

// CRUD básico
router.get('/', listarSubtareas);
router.get('/:id', obtenerSubtarea);
router.post('/', crearSubtarea);
router.put('/:id', actualizarSubtarea);
router.delete('/:id', eliminarSubtarea);

// Consultas específicas
router.get('/tarea/:idTarea', subtareasPorTarea);
router.get('/estado/pendientes', subtareasPendientes); // ?idTarea= opcional
router.get('/estado/completadas', subtareasCompletadas); // ?idTarea= opcional
router.patch('/:id/estado', cambiarEstado); // Cambiar estado (true/false)
router.delete('/tarea/:idTarea', eliminarPorTarea); // Eliminar todas las subtareas de una tarea

export default router;