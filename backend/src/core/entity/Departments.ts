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
}