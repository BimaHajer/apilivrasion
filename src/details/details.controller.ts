import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetailsService } from './details.service';
import { CreateDetailDto } from './dto/create-detail.dto';
import { UpdateDetailDto } from './dto/update-detail.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('details')
@ApiTags()
export class DetailsController {
  constructor(private readonly detailsService: DetailsService) {}

  @Post('create')
  create(@Body() createDetailDto: CreateDetailDto) {
    return this.detailsService.create(createDetailDto);
  }

  @Get('details-list')
  findAll() {
    return this.detailsService.findAll();
  }
 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailsService.findOneById(+id);
  }
 
  @Patch(':id')
  async updateProductDetail(@Param('id') id: number, @Body() updateDetailDto: UpdateDetailDto) {
   // Remplacez cela par la méthode pour obtenir l'ID de l'utilisateur authentifié
   let userId=1
    return this.detailsService.update(id,userId, updateDetailDto,);
  } 

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailsService.remove(id);
  }
  @Post('delete-multiple')
  removeMultiple(@Body('') toDelete: number[]) {
 
    return this.detailsService.removeMultiple(toDelete);
  }
}
