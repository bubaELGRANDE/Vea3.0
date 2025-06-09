import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Publishing } from './Publishing';
import { Categories } from './Categories';

@Entity()
export class PublishingCategories {
    @PrimaryGeneratedColumn()
    id!: number;    @ManyToOne(() => Publishing, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'publishingId' })
    publishing!: Publishing;

    @ManyToOne(() => Categories, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'categoryId' })
    category!: Categories;
}