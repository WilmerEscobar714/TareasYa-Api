
import  AppDataSource  from "../config/datasource";
import { Categorias } from "../entities/categorias";

const repository = AppDataSource.getRepository(Categorias);

export const listarCategorias = async() => {
    return repository.find({
        where: {
            auditoria: 1
        }
    });
}

export const listarCategoriasPorUsuario = async(idUsuario: number) => {
    return repository.find({
        where: {
            idUsuario: idUsuario,
            auditoria: 1
        }
    });
}