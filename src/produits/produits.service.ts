import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Produit } from './entities/produit.entity';
import { FindManyOptions, FindOptionsRelations, Repository } from 'typeorm';

@Injectable()
export class ProduitsService {
  constructor(   
    @InjectRepository(Produit)
    private produitResposity:Repository<Produit>,
  ){}
  async create(CreateProduitDto:CreateProduitDto) {
    let newProduit=this.produitResposity.create(CreateProduitDto)
  //   const cloudinary = require('cloudinary');
  //    cloudinary.v2.config({
  //     cloud_name: 'djqzhs9uw',
  //     api_key: '928451266649289',
  //     api_secret: '2pT3_lVW9gdHVbkbDst2q1fKaME',
  //     secure: true,
  //   });
  //         let  cloud= await cloudinary.uploader.upload(newProduit.pictures,{ eager: [{ fetch_format: "auto" } ]}, function (error: any, result: any,) {

  //             if (result?.eager[0].url) {
  //               newProduit.pictures = result.eager[0].url;  
  //           }
  //         })          
  //         console.log("result?.eager[0].url",cloud)
  // newProduit.pictures= await cloud.url
 
    return await this.produitResposity.save(newProduit)
    
  } 


 findAll(): Promise<[Produit[], number]> {
  

      return this.produitResposity.findAndCount({relations:['pictures','categoryId','markId']})
       }
  // async findOneById(id: number): Promise<object> {
  //   let produit = await this.produitResposity.findOne({ where: { id: id } })
  //     return produit
  //      }
       async findOneById(id: number): Promise<Produit> {
        if (isNaN(id)) {
          throw new BadRequestException('ID must be a valid number');
        }
        
        const produit = await this.produitResposity.findOne({ 
          where: { id },
          relations: ['pictures', 'categoryId', 'markId'] 
        });
        
        if (!produit) {
          throw new NotFoundException(`Product #${id} not found`);
        }
        
        return produit;
      }

  async update( id: number ,produitId: number ,UpdateProduitDto: UpdateProduitDto ) {
    const produit = await this.produitResposity.findOne({where:{id:id}});
    if (!produit) {
      throw new NotFoundException(`produit #${id} not found`);
    }


    const produitPreload = await this.produitResposity.preload({
      id: +id, 
      ...UpdateProduitDto,
      updatedBy: produitId,
    });  

    return this.produitResposity.save(produitPreload);
 
  }   


  async remove(id: string) {
    return await this.produitResposity.delete(id);
  }
  async removeMultiple(toDelete: number[]) {   
   
    let resultDelete: boolean = null
    let resultDisable: boolean = null
    const allIntegers = toDelete.every(item => Number.isInteger(item));
if (!allIntegers) {
    console.log('Invalid data in toDelete array');
    
    return;
}

    if (toDelete.length != 0) {
      if (await this.produitResposity.delete(toDelete)) {
        resultDelete = true
      } else
        resultDelete = false
        console.log("paymentResposity",this.produitResposity)
    }
  
  return true 
  }
}
