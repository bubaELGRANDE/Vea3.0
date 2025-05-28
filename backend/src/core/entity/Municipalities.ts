<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Departments } from './Departments';

@Entity()
=======
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { Departments } from './Departments';

@Entity('municipalities')
@Unique(['municipalityName', 'department'])
>>>>>>> main
export class Municipalities {
    @PrimaryGeneratedColumn()
    id!: number;

<<<<<<< HEAD
    @OneToOne(() => Departments, (departments) => departments.id)
    @JoinColumn()
    department_id!: Departments;
=======
    @ManyToOne(() => Departments, (departments) => departments.municipalities, {
        nullable: false
    })
    @JoinColumn({ name: 'department_id' })
    department!: Departments;
>>>>>>> main

    @Column({
        type: 'char',
        length: 50,
        nullable: false
    })
<<<<<<< HEAD
    municipality_name!: string;
}
=======
    municipalityName!: string;
}
>>>>>>> main
