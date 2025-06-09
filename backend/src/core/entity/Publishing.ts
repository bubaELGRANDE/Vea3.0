import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PublishingStatus } from './PublishingStatus';
import { Sellers } from './Sellers';
import { PublishingCategories } from './PublishingCategories';
import { PublishingDesc } from './PublishingDesc';
import { PublishingImg } from './PublishingImg';
import { Sales } from './Sales';
import { Chat } from './Chat';
import { Reviews } from './Reviews';

@Entity('publishing')
export class Publishing {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'char', length: 25 })
    title!: string;

    @Column('text')
    description!: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price!: number;

    @Column()
    type!: number;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt!: Date;

    // Relación con el estado de la publicación (unidireccional)
    // Se elimina la función `status => status.publishings` para resolver el error,
    // ya que la entidad PublishingStatus no tiene la propiedad inversa 'publishings'.
    @ManyToOne(() => PublishingStatus)
    @JoinColumn({ name: 'statusId' })
    status!: PublishingStatus;

    // Relación con el vendedor (unidireccional)
    // Se elimina la función `seller => seller.publishings` para resolver el error,
    // ya que la entidad Sellers no tiene la propiedad inversa 'publishings'.
    @ManyToOne(() => Sellers)
    @JoinColumn({ name: 'sellerId' })
    seller!: Sellers;
    
    // --- RELACIONES CLAVE PARA TAGS Y SKU ---

    // Relación para obtener las descripciones (y el SKU de ahí)
    @OneToMany(() => PublishingDesc, desc => desc.publishing)
    descriptions!: PublishingDesc[];

    // Relación para obtener las categorías (Tags)
    @OneToMany(() => PublishingCategories, pc => pc.publishing)
    categories!: PublishingCategories[];
    
    // ------------------------------------------

    // Otras relaciones que tu sistema podría usar
    @OneToMany(() => PublishingImg, img => img.publishing)
    images!: PublishingImg[];

    @OneToMany(() => Sales, sale => sale.publishing)
    sales!: Sales[];

    @OneToMany(() => Chat, chat => chat.publishing)
    chats!: Chat[];

    // --- RELACIÓN INCORRECTA ELIMINADA ---
    // La entidad Reviews se relaciona con Sales, no directamente con Publishing.
    // Para acceder a las reseñas de una publicación, se haría a través de sus ventas.
    // Por lo tanto, se elimina la relación directa con Reviews para evitar errores.
}
