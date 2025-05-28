<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
=======
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
>>>>>>> main
import { Publishing } from './Publishing';
import { Buyers } from './Buyers';
import { Sellers } from './Sellers';

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
<<<<<<< HEAD
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
=======
    id!: number;    @ManyToOne(() => Publishing, publishing => publishing.chats, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'publishingId' })
    publishing!: Publishing;

    @ManyToOne(() => Buyers, buyer => buyer.chats, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'buyerId' })
    buyer!: Buyers;

    @ManyToOne(() => Sellers, seller => seller.chats, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'sellerId' })
    seller!: Sellers;@Column({
        type: 'boolean',
        nullable: false
    })
    isEnable!: boolean;
>>>>>>> main
}