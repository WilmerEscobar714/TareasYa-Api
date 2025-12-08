// src/entities/tareas.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
// import { Usuario } from './usuario'; // COMENTA O ELIMINA ESTA LÍNEA SI NO TIENES ENTIDAD USUARIO
import { Categorias } from './categorias';
import { Subtarea } from './subtareas';



@Entity('tareas')
export class Tarea {
    @PrimaryGeneratedColumn({ name: 'id_tarea' })
    idTarea: number;

    @Column({ name: 'id_usuario' })
    idUsuario: number;

    @Column({ name: 'id_categoria', nullable: true })
    idCategoria: number;

    @Column({ name: 'titulo' })
    titulo: string;

    @Column({ name: 'descripcion', type: 'text', nullable: true })
    descripcion: string;

    @Column({ name: 'fecha_limite', type: 'date', nullable: true })
    fechaLimite: Date;

    @Column({ name: 'recordatorio_hora', type: 'time', nullable: true })
    recordatorioHora: string;

    @Column({ name: 'prioridad', length: 1, nullable: true })
    prioridad: string; // 'A', 'M', 'B'

    @Column({ name: 'estado', default: false })
    estado: boolean;

    @Column({ name: 'auditoria', default: 1 })
    auditoria: number;

    @Column({ name: 'fecha_creacion', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fechaCreacion: Date;

    // Relación con Categorias
    @ManyToOne(() => Categorias, categoria => categoria.tareas, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_categoria' })
    categoria: Categorias;

    // Relación con Subtareas
    @OneToMany(() => Subtarea, subtarea => subtarea.tarea)
    subtareas: Subtarea[];

    // Método para determinar si está vencida
    estaVencida(): boolean {
        if (!this.fechaLimite) return false;
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        const fechaLim = new Date(this.fechaLimite);
        return fechaLim < hoy && !this.estado;
    }

    // Método para obtener color según prioridad
    getColorPrioridad(): string {
        switch (this.prioridad) {
            case 'A': return '#F44336'; // Rojo
            case 'M': return '#FF9800'; // Naranja
            case 'B': return '#4CAF50'; // Verde
            default: return '#9E9E9E'; // Gris
        }
    }
}