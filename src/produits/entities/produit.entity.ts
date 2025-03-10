import { Category } from "src/category/entities/category.entity";
import { Mark } from "src/marks/entities/mark.entity";
import { Picture } from "src/pictures/entities/picture.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProduitDetail } from "../dto/create-produit.dto";

@Entity()
export class Produit {
    @PrimaryGeneratedColumn()
    id: number;
    @Column( 'text',{name:"Name", nullable:true})
    name: string;
    @Column('text',{name:"description",nullable:true})
    description: string;
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
    @Column("double precision", { name: "priceHorsTax", nullable: true })
    priceHorsTax: number | null;
    @Column("double precision", { name: "priceTTC", nullable: true })
    priceTTC: number | null;
    @ManyToOne(() => Mark, (mark: Mark) => mark.produits)
    @JoinColumn({ name: "markId" })
    markId: number | null; 
    @ManyToOne(() => Category, (category: Category) => category.produits)
    @JoinColumn({ name: "category" })
    categoryId: number | null; 
    @OneToMany(() => Picture, ( pictures:Picture) =>  pictures.produitId,{cascade:true})
    pictures: Picture[];


    // @OneToMany(() => ProduitDetail, (produitDetail: ProduitDetail) => produitDetail.produitId,{cascade:true})
    // produitDetail: ProduitDetail[];

   


    @BeforeInsert()
CreateATDate(): void{
this.createAt=new Date()

}

@BeforeUpdate()
updateATDate() :void{
    this.updateAt= new Date()
}

    
}



