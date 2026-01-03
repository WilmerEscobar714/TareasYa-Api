
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

export const crearUsuario = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        console.log('crearUsuario', data);
        
        // Verificar si el usuario ya existe
        const usuarioExistente = await usuarioService.buscarUsuarioPorEmail(data.email);
        if(usuarioExistente){
            res.status(400).json(BaseResponse.error('El email ya está registrado'));
            return;
        }
        
        const usuario = await usuarioService.crearUsuario(data);
        res.json(BaseResponse.success(usuario, 'Usuario creado exitosamente'));
    } catch (error) {
        console.error('crearUsuario:error',error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const listarUsuarios = async (req: Request, res: Response) => {
    try {
        const usuarios = await usuarioService.listarUsuarios();
        res.json(BaseResponse.success(usuarios));
    } catch (error) {
        console.error('listarUsuarios:error', error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}