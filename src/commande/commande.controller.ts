import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CommandeService } from './commande.service';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';


@Controller('commande')
export class CommandeController {
  constructor(private readonly commandeService: CommandeService) {}

  @Post('create')
  create(@Body() createCommandeDto: CreateCommandeDto) {
    return this.commandeService.create(createCommandeDto);
  } 

  @Get('commande-list')
  findAll() {
    return this.commandeService.findAll();
  }
  // findOrders(@Query('filter', new ParseObjectPipe()) filter?: FilterDto<Commande>) {
  //   return this.commandeService.findAll(filter);
  // }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commandeService.findOneById(+id);
  } 

  @Patch(':id')
  async updateOrder(@Param('id') id: number, @Body() updateCommandeDto: UpdateCommandeDto) {
   // Remplacez cela par la méthode pour obtenir l'ID de l'utilisateur authentifié
   let userId=1
    return this.commandeService.update(id,userId, updateCommandeDto,);
  } 

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandeService.remove(id);
  }
  @Post('delete-multiple')
  removeMultiple(@Body('') toDelete: number[]) {
 
    return this.commandeService.removeMultiple(toDelete);
  }
}
