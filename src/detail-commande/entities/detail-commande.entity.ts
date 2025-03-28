import { Commande } from "src/commande/entities/commande.entity";
import { Produit } from "src/produits/entities/produit.entity";


import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, 
     PrimaryGeneratedColumn, } from "typeorm";

@Entity('DetailCommande')

export class DetailCommande {
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
    @Column('integer',{name:"quantity", nullable:true})
    quantity:string
    @Column("double precision", { name: "TotalTTC", nullable: true })
    TotalTTC: number;
   
 

    @ManyToOne(() => Produit, (produits: Produit) => produits.id)
    @JoinColumn({ name: "produitId" })
    produitId: number ;
    
    @ManyToOne(() => Commande, (commande: Commande) => commande.id)
    @JoinColumn({ name: "commandeId" })
    commandeId: number | null;



    @BeforeInsert() 
CreateATDate(): void{
this.createAt=new Date()
}
@BeforeUpdate()
updateATDate() :void{
    this.updateAt= new Date()
}
}


