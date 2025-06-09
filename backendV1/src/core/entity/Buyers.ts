import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Users } from './Users';
import { Sales } from './Sales';
import { Chat } from './Chat';

@Entity()
export class Buyers {
    @PrimaryGeneratedColumn()
    id!: number;    @ManyToOne(() => Users, user => user.buyers, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user!: Users;@Column({
        type: 'varchar',
        length: 10,
        nullable: false
    })
    phone!: string;

    // Relaciones
    @OneToMany(() => Sales, sale => sale.buyer)
    sales!: Sales[];

    @OneToMany(() => Chat, chat => chat.buyer)
    chats!: Chat[];
}
