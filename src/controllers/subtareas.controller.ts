import { Request, Response } from 'express';
import * as subtareaService from '../services/subtareas.service';
import { BaseResponse } from '../shared/base-response';

export const listarSubtareas = async (req: Request, res: Response) => {
    try {
        const subtareas = await subtareaService.listarSubtareas();
        res.json(BaseResponse.success(subtareas));
    } catch (error) {
        console.error('listarSubtareas:error', error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const obtenerSubtarea = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const subtarea = await subtareaService.obtenerSubtarea(id);
        if (!subtarea) {
            res.status(404).json(BaseResponse.error('Subtarea no encontrada'));
            return;
        }
        res.json(BaseResponse.success(subtarea));
    } catch (error) {
        console.error('obtenerSubtarea:error', error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const crearSubtarea = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        console.log('crearSubtarea', data);
        const subtarea = await subtareaService.crearSubtarea(data);
        res.status(201).json(BaseResponse.success(subtarea, 'Subtarea creada exitosamente'));
    } catch (error) {
        console.error('crearSubtarea:error', error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const actualizarSubtarea = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        console.log('actualizarSubtarea', id, data);
        
        const subtareaExistente = await subtareaService.obtenerSubtarea(id);
        if (!subtareaExistente) {
            res.status(404).json(BaseResponse.error('Subtarea no encontrada'));
            return;
        }
        
        const subtareaActualizada = await subtareaService.actualizarSubtarea(id, data);
        res.json(BaseResponse.success(subtareaActualizada, 'Subtarea actualizada exitosamente'));
    } catch (error) {
        console.error('actualizarSubtarea:error', error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const eliminarSubtarea = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const resultado = await subtareaService.eliminarSubtarea(id);
        if (!resultado) {
            res.status(404).json(BaseResponse.error('Subtarea no encontrada'));
            return;
        }
        res.json(BaseResponse.success(null, 'Subtarea eliminada exitosamente'));
    } catch (error) {
        console.error('eliminarSubtarea:error', error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const subtareasPorTarea = async (req: Request, res: Response) => {
    try {
        const idTarea = parseInt(req.params.idTarea);
        const subtareas = await subtareaService.buscarSubtareasPorTarea(idTarea);
        res.json(BaseResponse.success(subtareas));
    } catch (error) {
        console.error('subtareasPorTarea:error', error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const subtareasPendientes = async (req: Request, res: Response) => {
    try {
        const idTarea = req.query.idTarea ? parseInt(req.query.idTarea as string) : undefined;
        const subtareas = await subtareaService.buscarSubtareasPendientes(idTarea);
        res.json(BaseResponse.success(subtareas));
    } catch (error) {
        console.error('subtareasPendientes:error', error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const subtareasCompletadas = async (req: Request, res: Response) => {
    try {
        const idTarea = req.query.idTarea ? parseInt(req.query.idTarea as string) : undefined;
        const subtareas = await subtareaService.buscarSubtareasCompletadas(idTarea);
        res.json(BaseResponse.success(subtareas));
    } catch (error) {
        console.error('subtareasCompletadas:error', error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const cambiarEstado = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { estado } = req.body;
        
        const subtareaExistente = await subtareaService.obtenerSubtarea(id);
        if (!subtareaExistente) {
            res.status(404).json(BaseResponse.error('Subtarea no encontrada'));
            return;
        }
        
        if (typeof estado !== 'boolean') {
            res.status(400).json(BaseResponse.error('El estado debe ser un valor booleano'));
            return;
        }
        
        const subtareaActualizada = await subtareaService.cambiarEstadoSubtarea(id, estado);
        const mensaje = estado ? 'Subtarea marcada como completada' : 'Subtarea marcada como pendiente';
        res.json(BaseResponse.success(subtareaActualizada, mensaje));
    } catch (error) {
        console.error('cambiarEstado:error', error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const eliminarPorTarea = async (req: Request, res: Response) => {
    try {
        const idTarea = parseInt(req.params.idTarea);
        const resultado = await subtareaService.eliminarSubtareasPorTarea(idTarea);
        
        if (!resultado) {
            res.status(404).json(BaseResponse.error('No se encontraron subtareas para eliminar'));
            return;
        }
        
        res.json(BaseResponse.success(null, 'Subtareas eliminadas exitosamente'));
    } catch (error) {
        console.error('eliminarPorTarea:error', error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}