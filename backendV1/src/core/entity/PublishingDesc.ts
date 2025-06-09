import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Publishing } from './Publishing';
import { ArticleStatus } from './ArticleStatus';

@Entity()
export class PublishingDesc {
    @PrimaryGeneratedColumn()
    id!: number;    @ManyToOne(() => Publishing, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'publishingId' })
    publishing!: Publishing;

    @ManyToOne(() => ArticleStatus, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'articleStatusId' })
    articleStatus!: ArticleStatus;

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