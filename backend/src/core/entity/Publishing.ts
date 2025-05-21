import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { PublishingStatus } from './PublishingStatus';
import { Sellers } from './Sellers';

@Entity()
export class Publishing {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => PublishingStatus , (status) => status.id)
    @JoinColumn()
    status_id!: PublishingStatus;

    @OneToOne(() => Sellers, (sellers) => sellers.id)
    @JoinColumn()
    seller_id!: Sellers;

    @Column({
        type: 'char',
        length: 25,
        nullable: false
    })
    title!: string;

    @Column({
        type: 'char',
        length: 25,
        nullable: false
    })
    article!: string;

    @Column({
        type: 'text',
        nullable: false
    })
    description!: string;

    @Column({
        type: 'char',
        length: 50,
        nullable: false
    })
    price!: string; // Cambiado de number a string para que coincida con type: 'char'

    @Column({
        type: 'int',
        nullable: false
    })
    type!: number;
}