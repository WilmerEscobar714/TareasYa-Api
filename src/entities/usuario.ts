import { Entity,PrimaryGeneratedColumn,Column } from "typeorm";

@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn({name: 'id_usuario'})
    idUsuario: number;

    @Column({name: 'nombre'})
    nombre: string;

    @Column({name: 'ape_paterno'})
    apePaterno: string;

    @Column({name: 'ape_materno'})
    apeMaterno: string;

    @Column({name: 'email'})
    email: string

    @Column({name: 'password'})
    password: string;

    @Column({name: 'auditoria'})
    auditoria: number;

    @Column({name: 'fecha_creacion'})
    fechaCreacion: Date;
}