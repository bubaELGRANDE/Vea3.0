import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Sales} from './Sales';
import { Payload } from './Payload';

@Entity()
export class SaleDet {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => Sales , (sales) => sales.id)
    @JoinColumn()
    sales_id!: Sales;

    @OneToOne(() => Payload , (payload) => payload.id)
    @JoinColumn()
    payload_id!: Payload;

    @Column({
        type: 'int',
        nullable: false
        })
    price!: number;
}