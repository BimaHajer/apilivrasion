
import { ProduitDetail } from "src/produits/dto/create-produit.dto";
import { Tva } from "src/tva/entities/tva.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany,
      ManyToOne,
      OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Price {
    @PrimaryGeneratedColumn()
    id: number;
    @Column('text',{name:"name",nullable:true})
    name: string;
    @Column('text',{name:"priceExcludingTax",nullable:true})
    priceExcludingTax: number;
   
    @Column('text',{name:"priceTTC",nullable:true})
    priceTTC: number;
    @Column('text',{name:"retailPrice",nullable:true})
    retailPrice: number;
    @Column('text',{name:"wholesalePrice",nullable:true})
    wholesalePrice: number;
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
  // Realation
  @OneToMany(() => Tva, (produitTva: Tva) => produitTva.priceId,{cascade:true})
  produitTvaproductTax: Tva[];
  //relation
 
//   @ManyToMany(() => ProduitDetail, (produitDetail: ProduitDetail) => produitDetail.priceId,{cascade:true})
//   produitDetail: ProduitDetail[];
    
  

@BeforeInsert()
CreateATDate(): void{
this.createAt=new Date()
}
@BeforeUpdate()
updateATDate() :void{
    this.updateAt= new Date()
}
}
