import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('categoria')
export class Categoria {
    @PrimaryGeneratedColumn({name: 'id_categoria'})
    idCategoria: number;

    @Column({name: 'nombre'})
    nombre: string;

    @Column({name: 'color', nullable: true})
    color: string;

    @Column({name: 'icono', nullable: true})
    icono: string;

    @Column({name: 'tareas_count', default: 0})
    tareasCount: number;

    @Column({name: 'id_usuario'})
    idUsuario: number;

    @Column({name: 'fecha_creacion', default: () => 'CURRENT_TIMESTAMP'})
    fechaCreacion: Date;
}