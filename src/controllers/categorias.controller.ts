
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
