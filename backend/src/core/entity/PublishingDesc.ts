import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Publishing } from './Publishing';
import { ArticleStatus } from './ArticleStatus';

@Entity()
export class PublishingDesc {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => Publishing, (publishing) => publishing.id)
    @JoinColumn()
    publishing_id!: Publishing;

    @OneToOne(() => ArticleStatus, (status) => status.id)
    @JoinColumn()
    article_status_id!: ArticleStatus;

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