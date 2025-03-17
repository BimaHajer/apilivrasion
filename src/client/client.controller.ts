import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('create-client')
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get('list-clients')
  findAll() {
    return this.clientService.findAll();
  }

  @Get('detail-client:id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @Patch('update-client/:id')
      async updateClient(@Param('id') id: number, @Body() UpdateClientDto: UpdateClientDto) {
       let ClientId=7
        return this.clientService.update(id,ClientId, UpdateClientDto,);
      } 
    
      @Delete('delete-client/:id')
      remove(@Param('id') id: number) {
        return this.clientService.remove(id);
      } 
      @Post('delete-multiple')
      removeMultiple(@Body('') toDelete: number[]) {
     
        return this.clientService.removeMultiple(toDelete);
      } 
    }
    
