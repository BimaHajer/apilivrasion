import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMarkDto } from './dto/create-mark.dto';
import { UpdateMarkDto } from './dto/update-mark.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Mark } from './entities/mark.entity';
import {Repository} from 'typeorm';

@Injectable()
export class MarksService {
  constructor(   
    @InjectRepository(Mark)
    private markResposity:Repository<Mark>,
  ){}
  async create(createMarkDto: CreateMarkDto) {
    let newMark=this.markResposity.create(createMarkDto)
    return await this.markResposity.save(newMark)
  }
  findAll(): Promise<[Mark[], number]> {
    return this.markResposity.findAndCount()
   }
  async findOneById(id: number): Promise<object> {
    let mark = await this.markResposity.findOne({ where: { id: id } })
    return mark
  }
  async update( id: number ,userId: number ,UpdateMarkDto: UpdateMarkDto ) {
      const mark = await this.markResposity.findOne({where:{id:id}});
      if (!mark) {
        throw new NotFoundException(`mark #${id} not found`);
      }
  
  
      const markPreload = await this.markResposity.preload({
        id: +id, 
        ...UpdateMarkDto,
        updatedBy: userId,
      });  
  
      return this.markResposity.save(markPreload);
   
    }  

 
    async remove(id: string) {
      return await this.markResposity.delete(id);
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
        if (await this.markResposity.delete(toDelete)) {
          resultDelete = true
        } else
          resultDelete = false
          console.log("accessoireResposity",this.markResposity)
      }

    return true
    }
}
