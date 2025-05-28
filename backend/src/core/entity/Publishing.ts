<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { PublishingStatus } from './PublishingStatus';
import { Sellers } from './Sellers';
=======
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { PublishingStatus } from './PublishingStatus';
import { Sellers } from './Sellers';
import { Sales } from './Sales';
import { Chat } from './Chat';
>>>>>>> main

@Entity()
export class Publishing {
    @PrimaryGeneratedColumn()
<<<<<<< HEAD
    id!: number;

    @OneToOne(() => PublishingStatus , (status) => status.id)
    @JoinColumn()
    status_id!: PublishingStatus;

    @OneToOne(() => Sellers, (sellers) => sellers.id)
    @JoinColumn()
    seller_id!: Sellers;
=======
    id!: number;    @ManyToOne(() => PublishingStatus, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'statusId' })
    status!: PublishingStatus;

    @ManyToOne(() => Sellers, seller => seller.publications, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'sellerId' })
    seller!: Sellers;
>>>>>>> main

    @Column({
        type: 'char',
        length: 25,
        nullable: false
    })
    title!: string;

    @Column({
<<<<<<< HEAD
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
=======
        type: 'text',
        nullable: false
    })
    description!: string;    
    
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    price!: number;
>>>>>>> main

    @Column({
        type: 'int',
        nullable: false
    })
    type!: number;
<<<<<<< HEAD
=======

    // Relaciones
    @OneToMany(() => Sales, sale => sale.publishing)
    sales!: Sales[];

    @OneToMany(() => Chat, chat => chat.publishing)
    chats!: Chat[];
>>>>>>> main
}