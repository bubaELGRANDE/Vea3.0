import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'char',
        length: 50,
        nullable: false
    })
    name!: string;

    @Column({
        type: 'char',
        length: 50,
        nullable: false
    })
    username!: string;

    @Column({
        type: 'char',
        length: 100,
        nullable: false
    })
    img!: string;

    @Column({
        type: 'int',
        default: false
    })
    token_version!: number;

    @Column({
        type: 'char',
        length: 100,
        nullable: false,
        unique: true
    })
    email!: string;

    @Column({
        type: 'char',
        length: 100,
        nullable: false
    })
    password!: string;

    @Column({
        type: 'boolean',
        default: true
    })
    isActive!: boolean;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt!: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    updatedAt!: Date;
}