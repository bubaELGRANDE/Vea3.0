import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import { Publishing } from './Publishing';
import { Buyers } from './Buyers';
import { SaleStatus } from './SaleStatus';
import { Reviews } from './Reviews';
import { Payload } from './Payload'; // Relación añadida con Payload

@Entity('sales') // Nombre explícito de la tabla
export class Sales {
    @PrimaryGeneratedColumn()
    id!: number;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;

    @ManyToOne(() => Publishing, publishing => publishing.sales, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'publishingId' })
    publishing!: Publishing;

    @ManyToOne(() => Buyers, buyer => buyer.sales, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'buyerId' })
    buyer!: Buyers;

    @ManyToOne(() => SaleStatus, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'statusId' })
    status!: SaleStatus;

    @OneToMany(() => Reviews, review => review.sale)
    reviews!: Reviews[];

    @OneToMany(() => Payload, payload => payload.sale)
    payloads!: Payload[]; // Relación inversa con Payloads
}
