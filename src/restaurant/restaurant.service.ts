import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class RestaurantService {
  constructor(   
    @InjectRepository(Restaurant)
    private readonly restaurantResposity: Repository<Restaurant>

  ){}
  async create(createRestaurantDto: CreateRestaurantDto) {
    let newRestaurant=this.restaurantResposity.create(createRestaurantDto)
    const cloudinary = require('cloudinary');
    cloudinary.v2.config({
      cloud_name: 'djqzhs9uw',
      api_key: '928451266649289',
      api_secret: '2pT3_lVW9gdHVbkbDst2q1fKaME',
      secure: true,
    });
          let  cloud= await cloudinary.uploader.upload(newRestaurant.picture,{ eager: [{ fetch_format: "auto" } ]}, function (error: any, result: any,) {

              if (result?.eager[0].url) {
                newRestaurant.picture = result.eager[0].url;  
            }
          })          
          console.log("result?.eager[0].url",cloud)
newRestaurant.picture= await cloud.url
    return await this.restaurantResposity.save(newRestaurant)
  }

  async findAll(): Promise<Restaurant[]> {
    return await this.restaurantResposity.find();
  }

  async findOne(id: number): Promise<Restaurant> {
    let restaurant = await this.restaurantResposity.findOne({ where: { id: id } });
    if (!restaurant) {
      throw new NotFoundException(`Restaurant #${id} not found`);
    }
    return restaurant;
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    const restaurant = await this.restaurantResposity.findOne({ where: { id: id } });
    if (!restaurant) {
      throw new NotFoundException(`Restaurant #${id} not found`);
    }
    const restaurantPreload = await this.restaurantResposity.preload({
      id: +id, 
      ...updateRestaurantDto,
    });
  
    if (!restaurantPreload) {
      throw new NotFoundException(`Cannot preload restaurant #${id}`);
    }
  
    return this.restaurantResposity.save(restaurantPreload);
  }
  

    
    
async remove(id: number) {
  const result = await this.restaurantResposity.delete(id);
  
  if (result.affected === 0) {
    throw new NotFoundException(`Restaurant #${id} not found`);
  }
  
  return { success: true, message: `Restaurant #${id} deleted` };
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
      if (await this.restaurantResposity.delete(toDelete)) {
        resultDelete = true
      } else
        resultDelete = false
        console.log("restaurantResposity",this.restaurantResposity)
    }
   
  return true
} 
}
