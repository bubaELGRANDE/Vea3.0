import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { Departments } from './Departments';

@Entity('municipalities')
@Unique(['municipalityName', 'department'])
export class Municipalities {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Departments, (departments) => departments.municipalities, {
        nullable: false
    })
    @JoinColumn({ name: 'department_id' })
    department!: Departments;

    @Column({
        type: 'char',
        length: 50,
        nullable: false
    })
    municipalityName!: string;
}
