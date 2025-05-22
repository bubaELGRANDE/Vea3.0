import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Departments } from './Departments';

@Entity()
export class Municipalities {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => Departments, (departments) => departments.id)
    @JoinColumn()
    department_id!: Departments;

    @Column({
        type: 'char',
        length: 50,
        nullable: false
    })
    municipality_name!: string;
}