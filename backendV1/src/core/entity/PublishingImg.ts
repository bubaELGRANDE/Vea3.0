import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Publishing } from './Publishing';

@Entity()
export class PublishingImg {
    @PrimaryGeneratedColumn()
    id!: number;    @ManyToOne(() => Publishing, publishing => publishing.images, { onDelete: 'CASCADE' })
@JoinColumn({ name: 'publishingId' })
publishing!: Publishing;

    @Column({
        type: 'text',
        nullable: false
    })
    img!: string;

    @Column({
        type: 'char',
        length: 50,
        nullable: false 
    })
    url!: string;
}