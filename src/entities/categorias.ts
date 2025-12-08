// src/entities/categorias.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'; // Añade OneToMany
import { Tarea } from './tareas'; 

@Entity('categorias')
export class Categorias {

    @PrimaryGeneratedColumn({name: 'id_categoria'})
    idcategoria: number;

    @Column({name: 'id_usuario'})
    idUsuario: number;

    @Column({name: 'nombre_cat'})
    nombreCat: string;

    @Column({name: 'auditoria'})
    auditoria: number;

    @Column({name: 'fecha_creacion'})
    fechaCreacion: Date;

    // AGREGA ESTA LÍNEA - Relación con Tareas
    @OneToMany(() => Tarea, tarea => tarea.categoria)
    tareas: Tarea[];
}