import AppDataSource from "../config/datasource";
import { Categoria } from "../entities/categoria";

const repository = AppDataSource.getRepository(Categoria);

export const obtenerCategoriasPorUsuario = async (idUsuario: number): Promise<Categoria[]> => {
    return repository.find({
        where: { idUsuario },
        order: { fechaCreacion: 'DESC' }
    });
}

export const crearCategoria = async (data: Partial<Categoria>): Promise<Categoria> => {
    const categoria = repository.create(data);
    return repository.save(categoria);
}

export const actualizarCategoria = async (idCategoria: number, data: Partial<Categoria>): Promise<Categoria> => {
    await repository.update(idCategoria, data);
    return repository.findOne({ where: { idCategoria } });
}

export const eliminarCategoria = async (idCategoria: number): Promise<void> => {
    await repository.delete(idCategoria);
}