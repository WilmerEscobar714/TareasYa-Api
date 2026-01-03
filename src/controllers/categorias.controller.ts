import { Request, Response } from 'express';
import { BaseResponse } from '../shared/base-response';
import * as categoriaService from '../services/categorias.service';

export const listarCategorias = async (req: Request, res: Response) => {
    try {
        const categorias = await categoriaService.listarCategorias();
        res.json(BaseResponse.success(categorias));
    } catch (error) {
        console.error('listarCategorias:error', error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const listarCategoriasPorUsuario = async (req: Request, res: Response) => {
    try {
        const { idUsuario } = req.params;
        const categorias = await categoriaService.listarCategoriasPorUsuario(parseInt(idUsuario));
        res.json(BaseResponse.success(categorias));
    } catch (error) {
        console.error('listarCategoriasPorUsuario:error', error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

// NUEVO: Endpoint para crear categoría
export const crearCategoria = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        console.log('crearCategoria - datos recibidos:', data);
        
        // Validaciones básicas
        if (!data.idUsuario || !data.nombreCat) {
            res.status(400).json(BaseResponse.error('Faltan datos requeridos: idUsuario y nombreCat'));
            return;
        }
        
        const categoria = await categoriaService.crearCategoria(data);
        res.json(BaseResponse.success(categoria, 'Categoría creada exitosamente'));
    } catch (error) {
        console.error('crearCategoria:error', error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

// NUEVO: Endpoint para eliminar categoría (lógica)
export const eliminarCategoria = async (req: Request, res: Response) => {
    try {
        const { idCategoria } = req.params;
        const categoria = await categoriaService.eliminarCategoria(parseInt(idCategoria));
        res.json(BaseResponse.success(categoria, 'Categoría eliminada exitosamente'));
    } catch (error) {
        console.error('eliminarCategoria:error', error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}