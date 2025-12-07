
import { Entity,PrimaryGeneratedColumn,Column } from 'typeorm';

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
}