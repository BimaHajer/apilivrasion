
import { Repository } from 'typeorm';
import { CreateLivreurDto } from './dto/create-livreur.dto';
import { UpdateLivreurDto } from './dto/update-livreur.dto';
import { Livreur } from './entities/livreur.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
const bcrypt=require('bcrypt')
@Injectable()
export class LivreurService {
  
  constructor(
    @InjectRepository(Livreur)
    private readonly livreurRepository:Repository<Livreur>
    ){}
    
    async findOneByEmail(email:string):Promise<Livreur |undefined>{
      return await this.livreurRepository.findOne({where:{email:email}})
    }
      async findId(email:string):Promise<number| undefined>
      {
        const livreur=await this.livreurRepository.findOne({ where:{email:email}});
        return livreur.id 
      }
    async create(createLivreurDto: CreateLivreurDto) {
      
      let newLivreur =  this.livreurRepository.create(createLivreurDto);
        newLivreur.isActive = true
       
        
        newLivreur.password = (await this.hashPassword(newLivreur.password)).toString()
        return await this.livreurRepository.save(newLivreur);
      }
      
      async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    
    
      }
      findAll(): Promise<[Livreur[], number]> {
    
        return this.livreurRepository.findAndCount()
      }
      async findOneById(id: number): Promise<object> {
        let livreur = await this.livreurRepository.findOne({ where: { id: id } })
        return livreur
      }
       async update(id: number, livreurId: number, updateLivreurDto: UpdateLivreurDto) {
        const livreur = await this.livreurRepository.findOne({ where: { id: id } });
        if (!livreur) {
          throw new NotFoundException(`Livreur #${id} not found`);
        }
    
    
        let livreurPreload = await this.livreurRepository.preload({
          id:+id,
          ...updateLivreurDto,
        });
    
        return this.livreurRepository.save(livreurPreload);
    
      }
      async remove(id: string) {
        return await this.livreurRepository.delete(id);
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
          if (await this.livreurRepository.delete(toDelete)) {
            resultDelete = true
          } else
            resultDelete = false
            console.log("unitsResposity",this.livreurRepository)
        }
    
      return true 
      }
     
}
