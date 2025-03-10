import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';

@Controller('pictures')
export class PicturesController {
  constructor(private readonly picturesService: PicturesService) {}

  @Get('/pictures')
  findAll() {
    return this.picturesService.findAll();
  }
  @Get('/picture/:id')
  findById(@Param('id') id: number) {
    return this.picturesService.findById(id);
  }
  @Post('/add-picture')
  createPicture(@Body() createPictureDto: CreatePictureDto,) {
    return this.picturesService.createPicture(createPictureDto);
  }

  @Patch('/picture/:id')
  async replaceById(@Param('id') id: number, @Body() updatePictureDto: UpdatePictureDto) {
    return this.picturesService.replaceById(id, updatePictureDto);
  }
  @Delete('/picture/:id')
  remove(@Param('id') id: number) { 
    return this.picturesService.remove(id);
  }
  @Post('/pictures/produit')
  removePictures(@Body() idsPictures: number[]) {
    return this.picturesService.removePictures(idsPictures);
  }

}
