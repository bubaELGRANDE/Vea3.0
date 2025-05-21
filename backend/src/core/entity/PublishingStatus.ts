import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity()
export class PublishingStatus {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'char',
        length: 25,
        nullable: false
    })
    status!: string;
}