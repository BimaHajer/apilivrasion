import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';

const bcrypt=require('bcrypt')

@Injectable()
export class ClientService {
  findOne(arg0: number) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository:Repository<Client>
    ){}
   
    async findOneByEmail(email:string):Promise<Client |undefined>{
      return await this.clientRepository.findOne({where:{email:email}})
    }
      async findId(email:string):Promise<number| undefined>
      {
        const client=await this.clientRepository.findOne({ where:{email:email}});
        return client.id 
      }
   
     
      async create(createClientDto: CreateClientDto): Promise<Client> {
        if (!createClientDto.password) {
          throw new Error("Password is required");
        }
      
        let newClient = this.clientRepository.create({ ...createClientDto });
        newClient.isActive = true;
        newClient.password = await this.hashPassword(createClientDto.password);
      
        return await this.clientRepository.save(newClient);
      }
      
     
      async hashPassword(password: string): Promise<string> {
        if (!password) {
          throw new Error("Password is required for hashing");
        }
      
        const saltRounds = 10; 
        return await bcrypt.hash(password, saltRounds);
      }
      async findAll(): Promise<Client[]> {
        // Utilise ton repository pour récupérer tous les clients
        return await this.clientRepository.find();
      }
      async findOneById(id: number): Promise<object> {
        let client = await this.clientRepository.findOne({ where: { id: id } })
        return client
      }
      
       async update(id: number, clientId: number, updateClientDto: UpdateClientDto) {
        const client = await this.clientRepository.findOne({ where: { id: id } });
        if (!client) {
          throw new NotFoundException(`client #${id} not found`);
        }
    
        // if (updateClientDto.password) {
        //   updateClientDto.password = (await this.hashPassword(updateClientDto.password)).toString()
        // }
    
        let clientPreload = await this.clientRepository.preload({
          id: +id,
          ...updateClientDto,  // ✅ Correct
        });
        
    
        return this.clientRepository.save(clientPreload);
    
      }
      async remove(id: string) {
        return await this.clientRepository.delete(id);
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
          if (await this.clientRepository.delete(toDelete)) {
            resultDelete = true
          } else
            resultDelete = false
            console.log("unitsResposity",this.clientRepository)
        }
    
      return true 
      }
     
}
