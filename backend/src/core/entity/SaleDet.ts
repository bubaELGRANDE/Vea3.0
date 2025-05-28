<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Sales} from './Sales';
=======
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Sales } from './Sales';
>>>>>>> main
import { Payload } from './Payload';

@Entity()
export class SaleDet {
    @PrimaryGeneratedColumn()
<<<<<<< HEAD
    id!: number;

    @OneToOne(() => Sales , (sales) => sales.id)
    @JoinColumn()
    sales_id!: Sales;

    @OneToOne(() => Payload , (payload) => payload.id)
    @JoinColumn()
    payload_id!: Payload;
=======
    id!: number;    @ManyToOne(() => Sales, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'saleId' })
    sale!: Sales;

    @ManyToOne(() => Payload, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'payloadId' })
    payload!: Payload;
>>>>>>> main

    @Column({
        type: 'int',
        nullable: false
        })
    price!: number;
}