import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoutiqueDto } from './dto/create-boutique.dto';
import { UpdateBoutiqueDto } from './dto/update-boutique.dto';
import { Boutique } from './entities/boutique.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BoutiqueService {
  constructor(
    @InjectRepository(Boutique)
    private readonly boutiqueRepository: Repository<Boutique>,
  ) {}

  async create(createBoutiqueDto: CreateBoutiqueDto) {
    const newBoutique = this.boutiqueRepository.create(createBoutiqueDto);
    const cloudinary = require('cloudinary');
    cloudinary.v2.config({
      cloud_name: 'djqzhs9uw',
      api_key: '928451266649289',
      api_secret: '2pT3_lVW9gdHVbkbDst2q1fKaME',
      secure: true,
    });
          let  cloud= await cloudinary.uploader.upload(newBoutique.picture,{ eager: [{ fetch_format: "auto" } ]}, function (error: any, result: any,) {

              if (result?.eager[0].url) {
                newBoutique.picture = result.eager[0].url;  
            }
          })          
          console.log("result?.eager[0].url",cloud)
          newBoutique.picture= await cloud.url
    return await this.boutiqueRepository.save(newBoutique);
  }

  async findAll(): Promise<Boutique[]> {
    return await this.boutiqueRepository.find();
  }

  async findOne(id: number): Promise<Boutique> {
    const boutique = await this.boutiqueRepository.findOne({ where: { id } });
    if (!boutique) {
      throw new NotFoundException(`Boutique #${id} not found`);
    }
    return boutique;
  }

  async update(id: number, updateBoutiqueDto: UpdateBoutiqueDto) {
    const boutique = await this.boutiqueRepository.findOne({ where: { id } });
    if (!boutique) {
      throw new NotFoundException(`Boutique #${id} not found`);
    }

    const boutiquePreload = await this.boutiqueRepository.preload({
      id: +id,
      ...updateBoutiqueDto,
    });

    if (!boutiquePreload) {
      throw new NotFoundException(`Cannot preload boutique #${id}`);
    }

    return this.boutiqueRepository.save(boutiquePreload);
  }

  async remove(id: number) {
    const result = await this.boutiqueRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Boutique #${id} not found`);
    }

    return { success: true, message: `Boutique #${id} deleted` };
  }

  // Méthode pour supprimer plusieurs boutiques à la fois
  async removeMultiple(toDelete: number[]) {
    const allIntegers = toDelete.every(item => Number.isInteger(item));

    if (!allIntegers) {
      console.log('Invalid data in toDelete array');
      return;
    }

    if (toDelete.length !== 0) {
      const result = await this.boutiqueRepository.delete(toDelete);
      return result.affected === toDelete.length;
    }

    return false;
  }
}
