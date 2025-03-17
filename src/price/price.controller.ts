import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PriceService } from './price.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('price')
@ApiTags()
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Post('create')
  create(@Body() createPriceDto: CreatePriceDto) {
    // return 'hello'
    return this.priceService.create(createPriceDto);
  }
 
  @Get('price-list')
  findAll() {
    return this.priceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.priceService.findOneById(+id);
  }

  @Patch(':id')
  async updatePrice(@Param('id') id: number, @Body() UpdatePriceDto: UpdatePriceDto) {
   // Remplacez cela par la méthode pour obtenir l'ID de l'utilisateur authentifié
   let userId=1
    return this.priceService.update(id,userId, UpdatePriceDto,);
  }  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.priceService.remove(id);
  }
  @Post('delete-multiple')
  removeMultiple(@Body('') toDelete: number[]) {
 
    return this.priceService.removeMultiple(toDelete);
  } 

}
