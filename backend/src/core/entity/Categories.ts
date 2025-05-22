import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Categories {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'char',
        length: 50,
        nullable: false
    })
    category!: string;
}