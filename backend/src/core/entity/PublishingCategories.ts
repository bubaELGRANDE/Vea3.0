import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Publishing } from './Publishing';
import { Categories } from './Categories';

@Entity()
export class PublishingCategories {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => Publishing, (publishing) => publishing.id)
    @JoinColumn()
    publishing_id!: Publishing;

    @OneToOne(() => Categories, (categories) => categories.id)
    @JoinColumn()
    category_id!: Categories;
}