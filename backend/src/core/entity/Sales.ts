import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Publishing } from './Publishing';
import { Buyers } from './Buyers';
import { SaleStatus } from './SaleStatus';

@Entity()
export class Sales {
    @PrimaryGeneratedColumn()
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
}