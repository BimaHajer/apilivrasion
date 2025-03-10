import { Category } from "src/category/entities/category.entity";
import { Mark } from "src/marks/entities/mark.entity";
import { Picture } from "src/pictures/entities/picture.entity";
import { Produit } from "../entities/produit.entity";

export class CreateProduitDto {
     id: number;
     name: string;
     description: string;
     createAt: Date ;
     updateAt: Date ;
     isActive: boolean ;
     createBy: number ;
     updatedBy: number ;
    public produitDetail?:ProduitDetail[] 
     pictures: Picture[];
}
export class ProduitDetail{
    public id?: number;
    public createAt?:Date;
    public updateAt?:Date;
    public createBy?:number;
    public updatedBy?:number;
    public isActive?:boolean
    // public color?:string;
    // public quantity?:number;
    // public accessoireId?: Accessoire;
    public markId?: number | Mark;
    public categoryId?: Category;
    // public unitsId?:  Units;  
    // public priceId?:Price ;
    // public TVAId?:TVA;
    public produitId?: Produit
    priceId: any;


}
