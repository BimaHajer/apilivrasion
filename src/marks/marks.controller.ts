import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarksService } from './marks.service';
import { CreateMarkDto } from './dto/create-mark.dto';
import { UpdateMarkDto } from './dto/update-mark.dto';

@Controller('marks')
export class MarksController {
  constructor(private readonly marksService: MarksService) {}

  @Post('create-mark')
  create(@Body() createMarkDto: CreateMarkDto) {
    // return "hello"
    return this.marksService.create(createMarkDto);
  }
 
  @Get('marks-list')
  findAll() {
    return this.marksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marksService.findOneById(+id);
  }

  @Patch('update-mark:id')
  async updateMark(@Param('id') id: number, @Body() UpdateMarkDto: UpdateMarkDto) {
   // Remplacez cela par la méthode pour obtenir l'ID de l'utilisateur authentifié
   let userId=1
    return this.marksService.update(id,userId, UpdateMarkDto,);
  }  
 

  @Delete('delete-mark/:id')
  remove(@Param('id') id: string) {
    return this.marksService.remove(id);
  }
  
  @Post('delete-multiple')
  removeMultiple(@Body('') toDelete: number[]) {
 
    return this.marksService.removeMultiple(toDelete);
  }
}
