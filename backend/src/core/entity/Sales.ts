<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Publishing } from './Publishing';
import { Buyers } from './Buyers';
import { SaleStatus } from './SaleStatus';
=======
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Publishing } from './Publishing';
import { Buyers } from './Buyers';
import { SaleStatus } from './SaleStatus';
import { Reviews } from './Reviews';
>>>>>>> main

@Entity()
export class Sales {
    @PrimaryGeneratedColumn()
<<<<<<< HEAD
    id!: number;

    @OneToOne(() => Publishing , (publishing) => publishing.id)
    @JoinColumn()
    publishing_id!: Publishing;

    @OneToOne(() => Buyers , (buyers) => buyers.id)
    @JoinColumn()
    buyer_id!: Buyers;

    @OneToOne(() => SaleStatus , (status) => status.id)
    @JoinColumn()
    status_id!: SaleStatus;
=======
    id!: number;    @ManyToOne(() => Publishing, publishing => publishing.sales, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'publishingId' })
    publishing!: Publishing;

    @ManyToOne(() => Buyers, buyer => buyer.sales, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'buyerId' })
    buyer!: Buyers;

    @ManyToOne(() => SaleStatus, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'statusId' })
    status!: SaleStatus;

    // Relaciones
    @OneToMany(() => Reviews, review => review.sale)
    reviews!: Reviews[];
>>>>>>> main
}