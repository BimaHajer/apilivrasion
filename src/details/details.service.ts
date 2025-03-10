import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDetailDto } from './dto/create-detail.dto';
import { UpdateDetailDto } from './dto/update-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDetail } from './entities/detail.entity';
import { ProduitDetail } from 'src/produits/dto/create-produit.dto';

@Injectable()
export class DetailsService {
  constructor(   
    @InjectRepository(ProduitDetail)
    private DetailResposity:Repository<ProduitDetail>,
  ){}
  async create( CreateDetailDto: CreateDetailDto) {
    let newDetail=this.DetailResposity.create( CreateDetailDto)
   console.log(CreateDetailDto)
    return await this.DetailResposity.save(newDetail)
  } 

  async findAll() {
    return await this.DetailResposity.findAndCount()
  }  
  async findOneById(id: number):Promise<object>{
    let  detail= await this.DetailResposity.findOne({where:{id:id}})
     return detail
    }  

    async update( id: number ,userId: number ,updateDetailDto: UpdateDetailDto ) {
      const detail = await this.DetailResposity.findOne({where:{id:id}});
      if (!detail) {
        throw new NotFoundException(`detail #${id} not found`);
      }
  
  
      const detailPreload = await this.DetailResposity.preload({
        id: +id, 
        ...updateDetailDto,
        updatedBy: userId, 
      });  
  
      return this.DetailResposity.save(detailPreload);
   
    }   
    async remove(id: string) {
      return await this.DetailResposity.delete(id);
    } 
    // toDisable: number[], idUser?: number
    async removeMultiple(toDelete: number[]) {   toDelete=[4,5,6]
      let resultDelete: boolean = null
      let resultDisable: boolean = null
      const allIntegers = toDelete.every(item => Number.isInteger(item));
  if (!allIntegers) {
      console.log('Invalid data in toDelete array');
      // Handle the error appropriately
      return;
  }
  
      if (toDelete.length != 0) {
        if (await this.DetailResposity.delete(toDelete)) {
          resultDelete = true
        } else
          resultDelete = false
          console.log("DetailResposity",this.DetailResposity)
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
