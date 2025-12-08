import { DataSource } from "typeorm";
import { Usuario } from "../entities/usuario";
import { Categorias } from "../entities/categorias";
import { Tarea } from "../entities/tareas";        
import { Subtarea } from "../entities/subtareas"; 

console.log('AppDataSource', {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME})

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [
        Usuario,
        Categorias,
        Tarea,       
        Subtarea
    ]
});

export default AppDataSource;