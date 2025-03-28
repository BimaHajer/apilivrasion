import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity('boutiques')
export class Boutique {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column('text', { name: 'nom', nullable: true })
    nom: string;

    @Column('text', { name: 'adresse', nullable: true })
    adresse: string;

    @Column('text', { name: 'telephone', nullable: true })
    telephone: string;

    @Column('text', { name: 'email', nullable: true })
    email?: string;

    @Column('text', { name: 'description', nullable: true })
    description?: string;

    @Column('date', { name: 'createAt', nullable: true })
    createAt?: Date;

    @Column('date', { name: 'updateAt', nullable: true })
    updateAt?: Date;

    @Column('integer', { name: 'createBy', nullable: true })
    createBy?: number;

    @Column('integer', { name: 'updatedBy', nullable: true })
    updatedBy?: number;

    @Column('boolean', { name: 'isActive', nullable: true })
    isActive?: boolean;
    @Column('text', { name: 'picture', nullable: true })
    picture?: string;

    @BeforeInsert()
    createDate() {
        this.createAt = new Date();
        this.isActive = true;  // Par défaut, la boutique est active lors de sa création
    }

    @BeforeUpdate()
    updateDate() {
        this.updateAt = new Date();
    }
}
