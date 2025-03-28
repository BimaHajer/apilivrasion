import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMarkDto } from './dto/create-mark.dto';
import { UpdateMarkDto } from './dto/update-mark.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Mark } from './entities/mark.entity';
import {Repository} from 'typeorm';
import {v2 as cloudinary} from 'cloudinary';

@Injectable()
export class MarksService {
  constructor(   
    @InjectRepository(Mark)
    private markResposity:Repository<Mark>,
  ){}
  async create(createMarkDto: CreateMarkDto) {
    let newMark=this.markResposity.create(createMarkDto)
    const cloudinary = require('cloudinary');
    cloudinary.v2.config({
      cloud_name: 'djqzhs9uw',
      api_key: '928451266649289',
      api_secret: '2pT3_lVW9gdHVbkbDst2q1fKaME',
      secure: true,
    });
 
          let  cloud= await cloudinary.uploader.upload(createMarkDto.picture,{ eager: [{ fetch_format: "auto" } ]}, function (error: any, result: any,) {
              if (result?.eager[0].url) {
                createMarkDto.picture = result.eager[0].url;  
            }
          })
          newMark.picture= await cloud.url
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
          console.log("markResposity",this.markResposity)
      }

    return true
    }
}
