import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

const bcrypt=require('bcrypt')
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>
    ){}
    
    async findOne(email:string):Promise<User |undefined>{
      return await this.userRepository.findOne({where:{email:email}})
    }
      async findId(email:string):Promise<number| undefined>
      {
        const user=await this.userRepository.findOne({ where:{email:email}});
        return user.id 
      }
    async create(createUserDto: CreateUserDto) {
    
        let newUser = this.userRepository.create(createUserDto)
        newUser.isActive = true
       
        
        newUser.password = (await this.hashPassword(newUser.password)).toString()
        return await this.userRepository.save(newUser);
      }
      
      async hashPassword(password: string): Promise<string> {
        const saltRounds = 10; // Number of salt rounds to use for hashing
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    
    
      }
      findAll(): Promise<[User[], number]> {
    
        return this.userRepository.findAndCount()
      }
      async findOneById(id: number): Promise<object> {
        let user = await this.userRepository.findOne({ where: { id: id } })
        return user
      }
       async update(id: number, userId: number, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.findOne({ where: { id: id } });
        if (!user) {
          throw new NotFoundException(`User #${id} not found`);
        }
    
        if (updateUserDto.password) {
          updateUserDto.password = (await this.hashPassword(updateUserDto.password)).toString()
        }
    
        const userPreload = await this.userRepository.preload({
          id: +id,
          ...updateUserDto,
          updatedBy: userId,
        });
    
        return this.userRepository.save(userPreload);
    
      }
      async remove(id: string) {
        return await this.userRepository.delete(id);
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
          if (await this.userRepository.delete(toDelete)) {
            resultDelete = true
          } else
            resultDelete = false
            console.log("unitsResposity",this.userRepository)
        }
    
      return true 
      }
     
    }
      