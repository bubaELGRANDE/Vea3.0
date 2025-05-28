<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Departments {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'char',
        length: 50,
        nullable: false
    })
    department_name!: string;
=======
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
>>>>>>> main
}