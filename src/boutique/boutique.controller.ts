import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { BoutiqueService } from './boutique.service';
import { CreateBoutiqueDto } from './dto/create-boutique.dto';
import { UpdateBoutiqueDto } from './dto/update-boutique.dto';

@Controller('boutique')
export class BoutiqueController {
  constructor(private readonly boutiqueService: BoutiqueService) {}

  @Post('create-boutique')
  create(@Body() createBoutiqueDto: CreateBoutiqueDto) {
    return this.boutiqueService.create(createBoutiqueDto);
  }

  @Get('list-boutiques')
  findAll() {
    return this.boutiqueService.findAll();
  }

  @Get('detail-boutique/:id')
  findOne(@Param('id') id: string) {
    return this.boutiqueService.findOne(+id);
  }

  @Patch('update-boutique/:id')
  update(@Param('id') id: string, @Body() updateBoutiqueDto: UpdateBoutiqueDto) {
    return this.boutiqueService.update(+id, updateBoutiqueDto);
  }

  @Delete('delete-boutique/:id')
  remove(@Param('id', ParseIntPipe) id: number) {  // Utilisation de ParseIntPipe pour la conversion
    return this.boutiqueService.remove(id);
  }

  @Post('delete-multiple')
  removeMultiple(@Body() toDelete: number[]) {
    return this.boutiqueService.removeMultiple(toDelete);
  }
}
