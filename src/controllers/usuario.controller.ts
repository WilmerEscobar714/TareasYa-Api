
import { Request, Response } from 'express';
import * as usuarioService from '../services/usuario.service';
import { BaseResponse } from '../shared/base-response';

export const verificarUsuario = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        console.log('verificarUsuario', data);
        const usuario = await usuarioService.verificarUsuario(data);
        if(!usuario){
            res.status(404).json(BaseResponse.error('No se encontraron datos'));
            return;
        }
        res.json(BaseResponse.success(usuario));
    } catch (error) {
        console.error('verificarUsuario:error',error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}