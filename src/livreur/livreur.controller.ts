import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LivreurService } from './livreur.service';
import { CreateLivreurDto } from './dto/create-livreur.dto';
import { UpdateLivreurDto } from './dto/update-livreur.dto';

@Controller('livreur')
export class LivreurController {
  constructor(private readonly livreurService: LivreurService) {}

  @Post('create-livreur')
  create(@Body() createLivreurDto: CreateLivreurDto) {
    return this.livreurService.create(createLivreurDto);
  }

  @Get('list-livreurs')
  findAll() {
    return this.livreurService.findAll();
  }

  @Get('detail-livreur/:id') // ✅ Correction
  findOne(@Param('id') id: string) {
    return this.livreurService.findOne(+id);
  }

  @Patch('update-livreur/:id')
  async updateLivreur(@Param('id') id: string, @Body() updateLivreurDto: UpdateLivreurDto) {
    let livreurId = 7;
    return this.livreurService.update(+id, livreurId, updateLivreurDto);
  }

  @Delete('delete-livreur/:id')
  remove(@Param('id') id: string) {
    return this.livreurService.remove(id);
  }

  @Post('delete-multiple')
  removeMultiple(@Body() toDelete: number[]) {
    if (!Array.isArray(toDelete) || toDelete.some(isNaN)) {
      throw new Error('Invalid data format. Expected an array of numbers.');
    }
    return this.livreurService.removeMultiple(toDelete);
  }
}
