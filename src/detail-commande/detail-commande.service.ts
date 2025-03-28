import { Injectable } from '@nestjs/common';
import { CreateDetailCommandeDto } from './dto/create-detail-commande.dto';
import { UpdateDetailCommandeDto } from './dto/update-detail-commande.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailCommande } from './entities/detail-commande.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DetailCommandeService {
  constructor(   
    @InjectRepository(DetailCommande)
    private commandeResposity:Repository<DetailCommande>,
  ){}
  async create( createDetailCommandeDto: CreateDetailCommandeDto) {
    let newCommande=this.commandeResposity.create( createDetailCommandeDto)
   console.log(createDetailCommandeDto)
    return await this.commandeResposity.save(newCommande)
  }  

  findAll() {
    return `This action returns all detailCommande`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detailCommande`;
  }

  update(id: number, updateDetailCommandeDto: UpdateDetailCommandeDto) {
    return `This action updates a #${id} detailCommande`;
  }

  remove(id: number) {
    return `This action removes a #${id} detailCommande`;
  }
}
