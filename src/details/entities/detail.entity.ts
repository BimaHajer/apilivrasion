
import { Category } from "src/category/entities/category.entity";
import { Mark } from "src/marks/entities/mark.entity";
import { Price } from "src/price/entities/price.entity";
import { Produit } from "src/produits/entities/produit.entity";

import { Tva } from "src/tva/entities/tva.entity";



import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('ProductDetail')
export class ProductDetail {
    @PrimaryGeneratedColumn()
    id: number;
    @Column('date',{name:"createAt",nullable:true})
    createAt:Date;
    @Column('date',{name:"update",nullable:true})
    updateAt:Date;
    @Column('integer',{name:"createby",nullable:true})
    createBy:number;
    @Column('integer',{name:"updatedBy",nullable:true})
    updatedBy:number;
    @Column('boolean',{name:"active",nullable:true})
    isActive:boolean
    @Column('text',{name:"color", nullable:true})
    color:string
    @Column('integer',{name:"quantity", nullable:true})
    quantity:number
   

    
   

    @ManyToOne(() => Mark, (mark: Mark) => mark.id)
    @JoinColumn({ name: "markId" })
    markId: number | null;

    @ManyToOne(() => Category, (category: Category) => category.id)
    @JoinColumn({ name: "categoryId" })
    categoryId: number | null;


  

    
    @ManyToOne(() => Price, (price: Price) => price.id)
    @JoinColumn({ name: "priceId" })
    priceId: number | null;

    @ManyToOne(() => Tva, (tva: Tva) => tva.id)
    @JoinColumn({ name: "TVAId" })
    TVAId: number | null;

   

    // @ManyToOne(() => Produit, (produit: Produit) => produit.id)
    // @JoinColumn({ name: "produitId" })
    // produitId: number | null;

 

@BeforeInsert()
CreateATDate(): void{
this.createAt=new Date()
}
@BeforeUpdate()
updateATDate() :void{
    this.updateAt= new Date()
}
}
