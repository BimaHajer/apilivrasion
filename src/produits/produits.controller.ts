import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProduitsService } from './produits.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';

@Controller('produits')
export class ProduitsController {
  constructor(private readonly produitsService: ProduitsService) {}

  @Post('create-produit')
  create(@Body() createProduitDto: CreateProduitDto) {
    console.log(createProduitDto)
    return this.produitsService.create(createProduitDto);
  } 

  @Get('list-produits')
  findAll() {
    return this.produitsService.findAll();
  } 

  @Get('detail-produit/:id')
  findOne(@Param('id') id: string) {
    return this.produitsService.findOneById(+id);
  }

  @Patch('update-produit/:id')
  async updateProduit(@Param('id') id: number, @Body() UpdateProduitDto: UpdateProduitDto) {
   let produitId=1
    return this.produitsService.update(id,produitId, UpdateProduitDto);
  }  

  @Delete('delete-produit/:id')
  remove(@Param('id') id: string) {
    return this.produitsService.remove(id);
  }
  @Post('delete-multiple')
  removeMultiple(@Body('') toDelete: number[]) {
 
    return this.produitsService.removeMultiple(toDelete);
  } 
}
