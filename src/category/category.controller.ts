import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create-category')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }
 
  @Get('list-category')
  findAll() {
    return this.categoryService.findAll();
  } 
 
  @Get('detail-category:id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOneById(+id);
  } 

  @Patch('update-category/:id')
  async updateCategory(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
   // Remplacez cela par la méthode pour obtenir l'ID de l'utilisateur authentifié
   let userId=1
    return this.categoryService.update(id,userId, updateCategoryDto,);
  } 
 
  @Delete('delete-category/:id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
  @Post('delete-multiple')
  removeMultiple(@Body('') toDelete: number[]) {
 
    return this.categoryService.removeMultiple(toDelete);
  }
}
