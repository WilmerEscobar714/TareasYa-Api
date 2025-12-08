import { Request, Response } from 'express';
import * as tareaService from '../services/tareas.service';
import { BaseResponse } from '../shared/base-response';

export const listarTareas = async (req: Request, res: Response) => {
    try {
        const tareas = await tareaService.listarTareas();
        res.json(BaseResponse.success(tareas));
    } catch (error) {
        console.error('listarTareas:error', error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const obtenerTarea = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const tarea = await tareaService.obtenerTarea(id);
        if (!tarea) {
            res.status(404).json(BaseResponse.error('Tarea no encontrada'));
            return;
        }
        res.json(BaseResponse.success(tarea));
    } catch (error) {
        console.error('obtenerTarea:error', error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const crearTarea = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        console.log('crearTarea', data);
        const tarea = await tareaService.crearTarea(data);
        res.status(201).json(BaseResponse.success(tarea, 'Tarea creada exitosamente'));
    } catch (error) {
        console.error('crearTarea:error', error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const actualizarTarea = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        console.log('actualizarTarea', id, data);
        
        const tareaExistente = await tareaService.obtenerTarea(id);
        if (!tareaExistente) {
            res.status(404).json(BaseResponse.error('Tarea no encontrada'));
            return;
        }
        
        const tareaActualizada = await tareaService.actualizarTarea(id, data);
        res.json(BaseResponse.success(tareaActualizada, 'Tarea actualizada exitosamente'));
    } catch (error) {
        console.error('actualizarTarea:error', error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const eliminarTarea = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const resultado = await tareaService.eliminarTarea(id);
        if (!resultado) {
            res.status(404).json(BaseResponse.error('Tarea no encontrada'));
            return;
        }
        res.json(BaseResponse.success(null, 'Tarea eliminada exitosamente'));
    } catch (error) {
        console.error('eliminarTarea:error', error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const tareasPorUsuario = async (req: Request, res: Response) => {
    try {
        const idUsuario = parseInt(req.params.idUsuario);
        const tareas = await tareaService.buscarTareasPorUsuario(idUsuario);
        res.json(BaseResponse.success(tareas));
    } catch (error) {
        console.error('tareasPorUsuario:error', error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

// Nuevos endpoints
export const tareasPorCategoria = async (req: Request, res: Response) => {
    try {
        const idCategoria = parseInt(req.params.idCategoria);
        const tareas = await tareaService.buscarTareasPorCategoria(idCategoria);
        res.json(BaseResponse.success(tareas));
    } catch (error) {
        console.error('tareasPorCategoria:error', error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const tareasPendientes = async (req: Request, res: Response) => {
    try {
        const tareas = await tareaService.buscarTareasPendientes();
        res.json(BaseResponse.success(tareas));
    } catch (error) {
        console.error('tareasPendientes:error', error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const tareasCompletadas = async (req: Request, res: Response) => {
    try {
        const tareas = await tareaService.buscarTareasCompletadas();
        res.json(BaseResponse.success(tareas));
    } catch (error) {
        console.error('tareasCompletadas:error', error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const tareasPorPrioridad = async (req: Request, res: Response) => {
    try {
        const prioridad = req.params.prioridad; // 'A', 'M', 'B'
        const tareas = await tareaService.buscarTareasPorPrioridad(prioridad);
        res.json(BaseResponse.success(tareas));
    } catch (error) {
        console.error('tareasPorPrioridad:error', error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const tareasVencidas = async (req: Request, res: Response) => {
    try {
        const tareas = await tareaService.buscarTareasVencidas();
        res.json(BaseResponse.success(tareas));
    } catch (error) {
        console.error('tareasVencidas:error', error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}