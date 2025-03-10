import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TvaService } from './tva.service';
import { CreateTvaDto } from './dto/create-tva.dto';
import { UpdateTvaDto } from './dto/update-tva.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('tva')
@ApiTags()

export class TvaController {
  constructor(private readonly tvaService: TvaService) {}

  @Post('create')
  create(@Body() createTvaDto: CreateTvaDto) {
    // return "hello"
    return this.tvaService.create(createTvaDto);
  }

  @Get('tva-list')
  findAll() {
    return this.tvaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tvaService.findOneById(+id);
  }

  @Patch(':id')
  async updateTva(@Param('id') id: number, @Body() UpdateTvaDto: UpdateTvaDto) {
   // Remplacez cela par la méthode pour obtenir l'ID de l'utilisateur authentifié
   let userId=1
    return this.tvaService.update(id,userId, UpdateTvaDto,);
  }  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tvaService.remove(id);
  }
  @Post('delete-multiple')
  removeMultiple(@Body('') toDelete: number[]) {
 
    return this.tvaService.removeMultiple(toDelete);
  } 
}
