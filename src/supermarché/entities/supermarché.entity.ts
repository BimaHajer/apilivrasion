import { BeforeInsert, Column, PrimaryGeneratedColumn } from "typeorm";

export class Supermarché {
     @PrimaryGeneratedColumn({ name: 'id' })
        id: number;
    
        @Column('text', { name: 'title', nullable: true })
        title: string;
    
        @Column('text', { name: 'description', nullable: true })
        description?: string;
    
        @Column('text', { name: 'address', nullable: true })
        address: string;
    
        @Column('text', { name: 'phone', nullable: true })
        phone?: string;
    
        @Column('text', { name: 'picture', nullable: true })
        picture?: string;
    
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
    
        @BeforeInsert()
        createDate() {
            this.createAt = new Date();
        }
}
