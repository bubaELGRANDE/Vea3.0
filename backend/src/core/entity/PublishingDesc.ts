<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
=======
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
>>>>>>> main
import { Publishing } from './Publishing';
import { ArticleStatus } from './ArticleStatus';

@Entity()
export class PublishingDesc {
    @PrimaryGeneratedColumn()
<<<<<<< HEAD
    id!: number;

    @OneToOne(() => Publishing, (publishing) => publishing.id)
    @JoinColumn()
    publishing_id!: Publishing;

    @OneToOne(() => ArticleStatus, (status) => status.id)
    @JoinColumn()
    article_status_id!: ArticleStatus;
=======
    id!: number;    @ManyToOne(() => Publishing, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'publishingId' })
    publishing!: Publishing;

    @ManyToOne(() => ArticleStatus, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'articleStatusId' })
    articleStatus!: ArticleStatus;
>>>>>>> main

    @Column({ 
        type: 'text',
    })
    description!: string;

    @Column({
        type: 'char',
        nullable: false
    })
    sku!: string;
}