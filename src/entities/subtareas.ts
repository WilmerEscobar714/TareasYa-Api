// src/entities/subtareas.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Tarea } from './tareas';

@Entity('subtareas')
export class Subtarea {
    @PrimaryGeneratedColumn({ name: 'id_subtarea' })
    idSubtarea: number;

    @Column({ name: 'id_tarea' })
    idTarea: number;

    @Column({ name: 'titulo' })
    titulo: string;

    @Column({ name: 'estado', default: false })
    estado: boolean;

    @Column({ name: 'auditoria', default: 1 })
    auditoria: number;

    @Column({ name: 'fecha_creacion', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fechaCreacion: Date;

    // Relación con Tarea
    @ManyToOne(() => Tarea, tarea => tarea.subtareas, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_tarea' })
    tarea: Tarea;
}