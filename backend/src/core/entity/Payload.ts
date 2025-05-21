import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Payload {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'char',
        length: 50,
        nullable: false
    })
    name!: string;
    
    @Column({
        type: 'char',
        length: 50,
        nullable: false
    })
    description!: string;

    @Column({
        type: 'char',
        length: 100,
        nullable: false
    })
    url!: string;
}