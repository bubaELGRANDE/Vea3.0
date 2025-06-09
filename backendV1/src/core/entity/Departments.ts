import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Municipalities } from './Municipalities';

@Entity('departments')
export class Departments {
    @PrimaryGeneratedColumn()
    id!: number;    @Column({
        name: 'department_name',
        type: 'char',
        length: 50,
        nullable: false,
        unique: true
    })
    department_name!: string;

    @OneToMany(() => Municipalities, (municipalities) => municipalities.department)
    municipalities!: Municipalities[];
}