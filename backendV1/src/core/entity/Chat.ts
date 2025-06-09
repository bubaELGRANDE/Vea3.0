import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Publishing } from './Publishing';
import { Buyers } from './Buyers';
import { Sellers } from './Sellers';

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
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
}