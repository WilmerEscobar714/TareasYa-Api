import AppDataSource from "../config/datasource";
import { Tarea } from "../entities/tareas"; 

const repository = AppDataSource.getRepository(Tarea); 

export const listarTareas = async (): Promise<Tarea[]> => { 
    return repository.find({
        relations: ['categoria', 'subtareas'] 
    });
}

export const obtenerTarea = async (id: number): Promise<Tarea> => { // Cambiado a Tarea
    return repository.findOne({
        where: { idTarea: id },
        relations: ['categoria', 'subtareas'] 
    });
}

export const crearTarea = async (data: Partial<Tarea>): Promise<Tarea> => { // Cambiado a Tarea
    const tarea = repository.create(data);
    return repository.save(tarea);
}

export const actualizarTarea = async (id: number, data: Partial<Tarea>): Promise<Tarea> => { // Cambiado a Tarea
    await repository.update(id, data);
    return obtenerTarea(id);
}

export const eliminarTarea = async (id: number): Promise<boolean> => {
    const result = await repository.delete(id);
    return result.affected > 0;
}

export const buscarTareasPorUsuario = async (idUsuario: number): Promise<Tarea[]> => { // Cambiado a Tarea[]
    return repository.find({
        where: { idUsuario: idUsuario },
        relations: ['categoria', 'subtareas'] // Opcional
    });
}

// Nuevos métodos adicionales basados en tu entidad
export const buscarTareasPorCategoria = async (idCategoria: number): Promise<Tarea[]> => {
    return repository.find({
        where: { idCategoria: idCategoria },
        relations: ['categoria', 'subtareas']
    });
}

export const buscarTareasPendientes = async (): Promise<Tarea[]> => {
    return repository.find({
        where: { estado: false },
        relations: ['categoria', 'subtareas']
    });
}

export const buscarTareasCompletadas = async (): Promise<Tarea[]> => {
    return repository.find({
        where: { estado: true },
        relations: ['categoria', 'subtareas']
    });
}

export const buscarTareasPorPrioridad = async (prioridad: string): Promise<Tarea[]> => {
    return repository.find({
        where: { prioridad: prioridad },
        relations: ['categoria', 'subtareas']
    });
}

export const buscarTareasVencidas = async (): Promise<Tarea[]> => {
    const tareas = await repository.find({
        where: { estado: false },
        relations: ['categoria', 'subtareas']
    });
    // Filtramos las que están vencidas usando el método de la entidad
    return tareas.filter(tarea => tarea.estaVencida());
}