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

export const listarCategoriasPorUsuario = async (idUsuario: number) => {
    // Cargar categorías con sus tareas (usando la relación)
    const categorias = await repository.find({
        where: {
            idUsuario: idUsuario,
            auditoria: 1
        },
        relations: ["tareas"]  // Cargar la relación con tareas
    });
    
    // Agregar contador manualmente
    return categorias.map(categoria => ({
        ...categoria,
        cantidadTareas: categoria.tareas ? categoria.tareas.length : 0
    }));
}

// NUEVO: Método para crear categoría
export const crearCategoria = async (data: any): Promise<Categorias> => {
    // Verificar si ya existe una categoría con el mismo nombre para el usuario
    const categoriaExistente = await repository.findOne({
        where: {
            idUsuario: data.idUsuario,
            nombreCat: data.nombreCat
        }
    });
    
    if (categoriaExistente) {
        throw new Error('Ya existe una categoría con este nombre para este usuario');
    }
    
    // Crear nueva categoría
    const categoria = repository.create({
        idUsuario: data.idUsuario,
        nombreCat: data.nombreCat,
        auditoria: data.auditoria || 1
    });
    
    return repository.save(categoria);
}

// NUEVO: Método para eliminar categoría (borrado lógico)
export const eliminarCategoria = async (idCategoria: number): Promise<Categorias> => {
    const categoria = await repository.findOne({
        where: { idcategoria: idCategoria }
    });
    
    if (!categoria) {
        throw new Error('Categoría no encontrada');
    }
    
    // Borrado lógico (cambiar auditoria a 0)
    categoria.auditoria = 0;
    return repository.save(categoria);
}