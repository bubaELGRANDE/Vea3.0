import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Sales } from './Sales';
import { SaleDet } from './SaleDet';

@Entity('payload')
export class Payload {
    @PrimaryGeneratedColumn()
    id!: number;

    // --- Campos generales ---
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

    // --- Campos de pago ---
    @Column('decimal', { precision: 10, scale: 2 })
    amount!: number;

    @Column({
        type: 'varchar',
        length: 50,
        name: 'payment_status'
    })
    payment_status!: string;

    @Column({ type: 'timestamp', name: 'payment_date', default: () => 'CURRENT_TIMESTAMP' })
    payment_date!: Date;

    @Column({ type: 'varchar', length: 255, name: 'transaction_id' })
    transaction_id!: string;

    @Column({ type: 'varchar', length: 50, name: 'payment_method' })
    payment_method!: string;

    // --- Relaciones ---
    @ManyToOne(() => Sales, sale => sale.payloads)
    @JoinColumn({ name: 'saleId' })
    sale!: Sales;

    @OneToMany(() => SaleDet, saleDetail => saleDetail.payload)
    saleDetails!: SaleDet[];
}
