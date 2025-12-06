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