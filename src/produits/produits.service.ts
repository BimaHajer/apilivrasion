import { Injectable, NotFoundException } from '@nestjs/common';
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
 
    return await this.produitResposity.save(newProduit)
    
  } 


 findAll(): Promise<[Produit[], number]> {

      return this.produitResposity.findAndCount()
       }
  async findOneById(id: number): Promise<object> {
    let produit = await this.produitResposity.findOne({ where: { id: id } })
      return produit
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
