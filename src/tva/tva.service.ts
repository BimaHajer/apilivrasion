import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTvaDto } from './dto/create-tva.dto';
import { UpdateTvaDto } from './dto/update-tva.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tva } from './entities/tva.entity';

@Injectable()
export class TvaService {
  constructor(   
    @InjectRepository(Tva)
    private tvaResposity:Repository<Tva>,
  ){}
  async create(CreateTvaDto: CreateTvaDto) {
    let newTva=this.tvaResposity.create(CreateTvaDto)
    return await this.tvaResposity.save(newTva)
  }

  findAll(): Promise<[Tva[],number]> {
    
    return this.tvaResposity.findAndCount()
  }
  

  async findOneById(id: number):Promise<object>{
    let  tva= await this.tvaResposity.findOne({where:{id:id}})
     return tva
    }


    async update( id: number ,userId: number ,UpdateTvaDto: UpdateTvaDto ) {
      const tva = await this.tvaResposity.findOne({where:{id:id}});
      if (!tva) {
        throw new NotFoundException(`tva #${id} not found`);
      }
  
  
      const tvaPreload = await this.tvaResposity.preload({
        id: +id, 
        ...UpdateTvaDto,
        updatedBy: userId,
      });  
  
      return this.tvaResposity.save(tvaPreload);
   
    }   

  
    async remove(id: string) {
      return await this.tvaResposity.delete(id);
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
        if (await this.tvaResposity.delete(toDelete)) {
          resultDelete = true
        } else
          resultDelete = false
          console.log("tvaResposity",this.tvaResposity)
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
