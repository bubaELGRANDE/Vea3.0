import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Sales } from './Sales';

@Entity()
export class Reviews {
    @PrimaryGeneratedColumn()
    id!: number;    @ManyToOne(() => Sales, sale => sale.reviews, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'saleId' })
    sale!: Sales;

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