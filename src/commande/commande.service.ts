import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Commande } from './entities/commande.entity';
import { FindManyOptions, FindOptionsRelations, Repository, createQueryBuilder } from 'typeorm';


@Injectable()
export class CommandeService {
  constructor(   
    @InjectRepository(Commande)
    private commandeResposity:Repository<Commande>,
  ){}

  async create( createCommandeDto: CreateCommandeDto) {
    let newCommande=this.commandeResposity.create( createCommandeDto)
   console.log(createCommandeDto)
    return await this.commandeResposity.save(newCommande)
  }  

  async findAll(): Promise<[Commande[], number]> {
    const options: FindManyOptions<Commande> = {
      relations: ['CustomerId', 'CommandDetail', 'transactions', 'CommandDetail.productId'],
    };

    return await this.commandeResposity.findAndCount(options);
  }
  
  

  async findOneById(id: number):Promise<object>{
    let  commande= await this.commandeResposity.findOne({relations:[ 'CommandDetail', 'transactions', 'CommandDetail.productId'],where:{id:id}})
     return commande
    }  

    async update( id: number ,userId: number ,updateCommandeDto: UpdateCommandeDto ) {
      const commande = await this.commandeResposity.findOne({where:{id:id}});
      if (!commande) {
        throw new NotFoundException(`commande #${id} not found`);
      }
  
  
      const commandePreload = await this.commandeResposity.preload({
        id: +id, 
        ...updateCommandeDto,
        updatedBy: userId, 
      });  
  
      return this.commandeResposity.save(commandePreload);
   
    }    

    async remove(id: string) {
      return await this.commandeResposity.delete(id);
    } 
    // toDisable: number[], idUser?: number
    async removeMultiple(toDelete: number[]) {   
      let resultDelete: boolean = null
      let resultDisable: boolean = null
      const allIntegers = toDelete.every(item => Number.isInteger(item));
  if (!allIntegers) {
      console.log('Invalid data in toDelete array');
      // Handle the error appropriately
      return;
  }
  
      if (toDelete.length != 0) {
        if (await this.commandeResposity.delete(toDelete)) {
          resultDelete = true
        } else
          resultDelete = false
       
      }
    //   if (toDisable.length != 0) {
    //     if (await this.accessoireResposity.update(toDisable, { updatedBy: idUser, updateAt: new Date(), isActive: false })) {
    //       resultDisable = true
    //     } else
    //       resultDisable = false
    //   }
    //   if (((toDelete.length != 0 && resultDelete == true) || (toDelete.length == 0 && resultDelete == null)) &&
    //     ((toDisable.length != 0 && resultDisable == true) || (toDisable.length == 0 && resultDisable == null))) {
    //     return true
    //   } else
    //     return false
    // }
    return true
    }
}
