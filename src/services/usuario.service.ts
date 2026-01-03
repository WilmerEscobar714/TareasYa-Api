import  AppDataSource  from "../config/datasource";
import { Usuario } from "../entities/usuario";

const repository = AppDataSource.getRepository(Usuario);

export const verificarUsuario = async (data: Partial<Usuario>): Promise<Usuario> => {
    return repository.findOne({
        where: {
            email: data.email,
            password: data.password
        }
    });
}


export const buscarUsuarioPorEmail = async (email: string): Promise<Usuario> => {
    return repository.findOne({
        where: { email: email }
    });
}

export const crearUsuario = async (data: Partial<Usuario>): Promise<Usuario> => {
    const usuario = repository.create(data);
    return repository.save(usuario);
    
}

export const listarUsuarios = async (): Promise<Usuario[]> => {
    return repository.find({
        order: { idUsuario: 'ASC' }
    });
}