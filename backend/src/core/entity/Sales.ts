import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Publishing } from './Publishing';
import { Buyers } from './Buyers';
import { SaleStatus } from './SaleStatus';
import { Reviews } from './Reviews';

@Entity()
export class Sales {
    @PrimaryGeneratedColumn()
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
}