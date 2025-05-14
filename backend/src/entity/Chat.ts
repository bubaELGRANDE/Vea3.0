import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Publishing } from './Publishing';
import { Buyers } from './Buyers';
import { Sellers } from './Sellers';

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => Publishing , (publishing) => publishing.id)
    @JoinColumn()
    publishing_id!: Publishing;

    @OneToOne(() => Buyers , (buyers) => buyers.id)
    @JoinColumn()
    buyers_id!: Buyers;

    @OneToOne(() => Sellers , (sellers) => sellers.id)
    @JoinColumn()
    sellers_id!: Sellers;

    @Column({
        type: 'boolean',
        nullable: false
    })
    is_enable!: boolean;
}