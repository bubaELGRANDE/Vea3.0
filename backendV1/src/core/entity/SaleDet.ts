import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Sales } from './Sales';
import { Payload } from './Payload';

@Entity()
export class SaleDet {
    @PrimaryGeneratedColumn()
    id!: number;    @ManyToOne(() => Sales, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'saleId' })
    sale!: Sales;

    @ManyToOne(() => Payload, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'payloadId' })
    payload!: Payload;

    @Column({
        type: 'int',
        nullable: false
        })
    price!: number;
}