import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { SupermarchéService } from './supermarché.service';
import { CreateSupermarchéDto } from './dto/create-supermarché.dto';
import { UpdateSupermarchéDto } from './dto/update-supermarché.dto';

@Controller('supermarché')
export class SupermarchéController {
  constructor(private readonly supermarchéService: SupermarchéService) {}

@Post('create-supermarché')
  create(@Body() createSupermarchéDto: CreateSupermarchéDto) {
    return this.supermarchéService.create(createSupermarchéDto);
  }

  @Get('list-supermarché')
  findAll() {
    return this.supermarchéService.findAll();
  }

  @Get('detail-supermarché/:id')
  findOne(@Param('id') id: string) {
    return this.supermarchéService.findOne(+id);
  }

  @Patch('update-supermarché/:id')
  update(@Param('id') id: string, @Body() updateSupermarchéDto: UpdateSupermarchéDto) {
    return this.supermarchéService.update(+id, updateSupermarchéDto);
  }

  @Delete('delete-supermarché/:id')
  remove(@Param('id', ParseIntPipe) id: number) {  // Utilisez ParseIntPipe pour la conversion
    return this.supermarchéService.remove(id);
  }
  
  @Post('delete-multiple')
  removeMultiple(@Body('') toDelete: number[]) {
   
      return this.supermarchéService.removeMultiple(toDelete);
    }
}
