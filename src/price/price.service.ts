import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Price } from './entities/price.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PriceService {
  constructor(   
    @InjectRepository(Price)
    private priceResposity:Repository<Price>,
  ){}
  async create(CreatePriceDto: CreatePriceDto) {
    let newPrice=this.priceResposity.create(CreatePriceDto)
    return await this.priceResposity.save(newPrice)
  }

  async findAll() { 
    return await this.priceResposity.findAndCount()
  }

  async findOneById(id: number):Promise<object>{
    let  price= await this.priceResposity.findOne({where:{id:id}})
     return price
    }

    async update( id: number ,userId: number ,UpdatePriceDto: UpdatePriceDto ) {
      const price = await this.priceResposity.findOne({where:{id:id}});
      if (!price) {
        throw new NotFoundException(`price #${id} not found`);
      }
  
  
      const pricePreload = await this.priceResposity.preload({
        id: +id, 
        ...UpdatePriceDto,
        updatedBy: userId,
      });  
  
      return this.priceResposity.save(pricePreload);
   
    }   

    async remove(id: string) {
      return await this.priceResposity.delete(id);
    }
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
        if (await this.priceResposity.delete(toDelete)) {
          resultDelete = true
        } else
          resultDelete = false
          console.log("priceResposity",this.priceResposity)
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
