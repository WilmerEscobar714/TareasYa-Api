import { Request, Response } from 'express';
import * as categoriaService from '../services/categoria.service';
import { BaseResponse } from '../shared/base-response';

export const obtenerCategorias = async (req: Request, res: Response) => {
    try {
        const idUsuario = parseInt(req.params.idUsuario);
        const categorias = await categoriaService.obtenerCategoriasPorUsuario(idUsuario);
        res.json(BaseResponse.success(categorias));
    } catch (error) {
        console.error('obtenerCategorias:error', error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const crearCategoria = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        console.log('crearCategoria', data);
        const categoria = await categoriaService.crearCategoria(data);
        res.json(BaseResponse.success(categoria, 'Categoría creada exitosamente'));
    } catch (error) {
        console.error('crearCategoria:error', error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const actualizarCategoria = async (req: Request, res: Response) => {
    try {
        const idCategoria = parseInt(req.params.idCategoria);
        const data = req.body;
        const categoria = await categoriaService.actualizarCategoria(idCategoria, data);
        res.json(BaseResponse.success(categoria, 'Categoría actualizada'));
    } catch (error) {
        console.error('actualizarCategoria:error', error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const eliminarCategoria = async (req: Request, res: Response) => {
    try {
        const idCategoria = parseInt(req.params.idCategoria);
        await categoriaService.eliminarCategoria(idCategoria);
        res.json(BaseResponse.success(null, 'Categoría eliminada'));
    } catch (error) {
        console.error('eliminarCategoria:error', error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}