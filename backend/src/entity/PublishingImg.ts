import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Publishing } from './Publishing';

@Entity()
export class PublishingImg {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => Publishing, (publishing) => publishing.id)
    @JoinColumn()
    publishing_id!: Publishing;

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