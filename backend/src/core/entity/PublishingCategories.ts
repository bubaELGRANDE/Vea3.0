<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
=======
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
>>>>>>> main
import { Publishing } from './Publishing';
import { Categories } from './Categories';

@Entity()
export class PublishingCategories {
    @PrimaryGeneratedColumn()
<<<<<<< HEAD
    id!: number;

    @OneToOne(() => Publishing, (publishing) => publishing.id)
    @JoinColumn()
    publishing_id!: Publishing;

    @OneToOne(() => Categories, (categories) => categories.id)
    @JoinColumn()
    category_id!: Categories;
=======
    id!: number;    @ManyToOne(() => Publishing, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'publishingId' })
    publishing!: Publishing;

    @ManyToOne(() => Categories, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'categoryId' })
    category!: Categories;
>>>>>>> main
}