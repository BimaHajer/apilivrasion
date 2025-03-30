import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupermarchéDto } from './dto/create-supermarché.dto';
import { UpdateSupermarchéDto } from './dto/update-supermarché.dto';
import { Supermarché } from './entities/supermarché.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SupermarchéService {
  constructor(   
    @InjectRepository(Supermarché)
    private readonly supermarchéResposity: Repository<Supermarché>

  ){}
  async create(createSupermarchéDto: CreateSupermarchéDto) {
    let newSupermarché=this.supermarchéResposity.create(createSupermarchéDto)
    const cloudinary = require('cloudinary');
    cloudinary.v2.config({
      cloud_name: 'djqzhs9uw',
      api_key: '928451266649289',
      api_secret: '2pT3_lVW9gdHVbkbDst2q1fKaME',
      secure: true,
    });
          let  cloud= await cloudinary.uploader.upload(newSupermarché.picture,{ eager: [{ fetch_format: "auto" } ]}, function (error: any, result: any,) {

              if (result?.eager[0].url) {
                newSupermarché.picture = result.eager[0].url;  
            }
          })          
          console.log("result?.eager[0].url",cloud)
newSupermarché.picture= await cloud.url
    return await this.supermarchéResposity.save(newSupermarché)
  }

  async findAll(): Promise<Supermarché[]> {
    return await this.supermarchéResposity.find();
  }

  async findOne(id: number): Promise<Supermarché> {
    let supermarché = await this.supermarchéResposity.findOne({ where: { id: id } });
    if (!supermarché) {
      throw new NotFoundException(`supermarché #${id} not found`);
    }
    return supermarché;
  }

  async update(id: number, updateSupermarchéDto: UpdateSupermarchéDto) {
    const supermarché = await this.supermarchéResposity.findOne({ where: { id: id } });
    if (!supermarché) {
      throw new NotFoundException(`supermarché #${id} not found`);
    }
    const supermarchéPreload = await this.supermarchéResposity.preload({
      id: +id, 
      ...updateSupermarchéDto,
    });
  
    if (!supermarchéPreload) {
      throw new NotFoundException(`Cannot preload supermarché #${id}`);
    }
  
    return this.supermarchéResposity.save(supermarchéPreload);
  }
   
    
async remove(id: number) {
  const result = await this.supermarchéResposity.delete(id);
  
  if (result.affected === 0) {
    throw new NotFoundException(`supermarché #${id} not found`);
  }
  
  return { success: true, message: `supermarché #${id} deleted` };
}
    // toDisable: number[], idUser?: number
  async removeMultiple(toDelete: number[]) {   
    
    console.log("toDelete",toDelete)
    let resultDelete: boolean = null
    let resultDisable: boolean = null
    const allIntegers = toDelete.every(item => Number.isInteger(item));
if (!allIntegers) {
    console.log('Invalid data in toDelete array');
    // Handle the error appropriately
    return;
}

    if (toDelete.length != 0) {
      if (await this.supermarchéResposity.delete(toDelete)) {
        resultDelete = true
      } else
        resultDelete = false
        console.log("restaurantResposity",this.supermarchéResposity)
    }
   
  return true
} 
}
