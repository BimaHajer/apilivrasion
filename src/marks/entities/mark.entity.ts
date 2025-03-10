import { Produit } from "src/produits/entities/produit.entity";
import {BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Mark {
    @PrimaryGeneratedColumn()
    id: number;
    @Column( 'text',{name:"titre", nullable:true})
    title: string;
    @Column('text',{name:"description",nullable:true})
    description: string;
    @Column('text',{name:"status",nullable:true})
    status: boolean;
    @Column('text',{name:"picture",nullable:true})
    picture: string;
    @Column('date',{name:"createAt",nullable:true})
    createAt:Date;
    @Column('date',{name:"updateAt",nullable:true})
    updateAt:Date;
    @Column('integer',{name:"createby",nullable:true})
    createBy:number;
    @Column('integer',{name:"updatedBy",nullable:true})
    updatedBy:number;
    @Column('boolean',{name:"active",nullable:true})
    isActive:boolean
    @OneToMany(() => Produit, (produit: Produit) => produit.markId)
    produits:Produit[]
     @BeforeInsert()
        createDate(){
            this.createAt= new Date()
        }
}
