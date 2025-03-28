import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetailCommandeService } from './detail-commande.service';
import { CreateDetailCommandeDto } from './dto/create-detail-commande.dto';
import { UpdateDetailCommandeDto } from './dto/update-detail-commande.dto';


@Controller('detail-commande')
export class DetailCommandeController {
  constructor(private readonly detailcommandeservice: DetailCommandeService) {}

  @Post('create-commande')
  create(@Body() createDetailCommandeDto: CreateDetailCommandeDto) {
    return this.detailcommandeservice.create(createDetailCommandeDto);
  }

  @Get('list-detail-commande')
  findAll() {
    return this.detailcommandeservice.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailcommandeservice.findOne(+id);
  }

  @Patch(':id')
  updateOrderDetail(@Param('id') id: string, @Body() updateDetailCommandeDto: UpdateDetailCommandeDto) {
    return this.detailcommandeservice.update(+id, updateDetailCommandeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailcommandeservice.remove(+id);
  }
}
