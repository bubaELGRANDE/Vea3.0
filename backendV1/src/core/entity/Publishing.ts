import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { PublishingStatus } from './PublishingStatus';
import { Sellers } from './Sellers';
import { Sales } from './Sales';
import { Chat } from './Chat';
import { PublishingImg } from './PublishingImg';
import { PublishingCategories } from './PublishingCategories';

@Entity()
export class Publishing {
    @PrimaryGeneratedColumn()
    id!: number; @ManyToOne(() => PublishingStatus, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'statusId' })
    status!: PublishingStatus;

    @ManyToOne(() => Sellers, seller => seller.publications, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'sellerId' })
    seller!: Sellers;

    @Column({
        type: 'char',
        length: 25,
        nullable: false
    })
    title!: string;

    @Column({
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

    @Column({
        type: 'int',
        nullable: false
    })
    type!: number;

    // Relaciones

    @OneToMany(() => PublishingCategories, pc => pc.publishing)
    publishingCategories!: PublishingCategories[];

    @OneToMany(() => PublishingImg, img => img.publishing)
    images!: PublishingImg[];

    @OneToMany(() => Sales, sale => sale.publishing)
    sales!: Sales[];

    @OneToMany(() => Chat, chat => chat.publishing)
    chats!: Chat[];
}