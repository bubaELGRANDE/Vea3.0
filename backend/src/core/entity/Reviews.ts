import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Sales } from './Sales';

@Entity()
export class Reviews {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => Sales , (sales) => sales.id)
    @JoinColumn()
    sales_id!: Sales;

    @Column({
        type: 'text',
        nullable: false
    })
    review!: string;

    @Column({
        type: 'int',
        nullable: false
        })
    rating!: number;
}