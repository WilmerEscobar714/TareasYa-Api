import AppDataSource from "../config/datasource";
import { Subtarea } from "../entities/subtareas";

const repository = AppDataSource.getRepository(Subtarea);

export const listarSubtareas = async (): Promise<Subtarea[]> => {
    return repository.find({
        relations: ['tarea']
    });
}

export const obtenerSubtarea = async (id: number): Promise<Subtarea> => {
    return repository.findOne({
        where: { idSubtarea: id },
        relations: ['tarea']
    });
}

export const crearSubtarea = async (data: Partial<Subtarea>): Promise<Subtarea> => {
    const subtarea = repository.create(data);
    return repository.save(subtarea);
}

export const actualizarSubtarea = async (id: number, data: Partial<Subtarea>): Promise<Subtarea> => {
    await repository.update(id, data);
    return obtenerSubtarea(id);
}

export const eliminarSubtarea = async (id: number): Promise<boolean> => {
    const result = await repository.delete(id);
    return result.affected > 0;
}

export const buscarSubtareasPorTarea = async (idTarea: number): Promise<Subtarea[]> => {
    return repository.find({
        where: { idTarea: idTarea },
        relations: ['tarea']
    });
}

export const buscarSubtareasPendientes = async (idTarea?: number): Promise<Subtarea[]> => {
    const whereClause: any = { estado: false };
    
    if (idTarea) {
        whereClause.idTarea = idTarea;
    }
    
    return repository.find({
        where: whereClause,
        relations: ['tarea']
    });
}

export const buscarSubtareasCompletadas = async (idTarea?: number): Promise<Subtarea[]> => {
    const whereClause: any = { estado: true };
    
    if (idTarea) {
        whereClause.idTarea = idTarea;
    }
    
    return repository.find({
        where: whereClause,
        relations: ['tarea']
    });
}

export const cambiarEstadoSubtarea = async (id: number, estado: boolean): Promise<Subtarea> => {
    await repository.update(id, { estado });
    return obtenerSubtarea(id);
}

export const eliminarSubtareasPorTarea = async (idTarea: number): Promise<boolean> => {
    const result = await repository.delete({ idTarea });
    return result.affected > 0;
}