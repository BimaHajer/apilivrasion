import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')

export class UserController {
  constructor(private readonly userService: UserService) {}
  // @UseGuards(AuthGuard)
  // @UseGuards(AuthGuard)

  @Post('create-user')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('list-users')
  findAll() {
    return this.userService.findAll();
  }

  @Get('detail-user/:id')
  findOne(@Param('id') id: number) {
    return this.userService.findOneById(+id);
  }

  @Patch('update-user/:id')
  async updateUser(@Param('id') id: number, @Body() UpdateUserDto: UpdateUserDto) {
   let userId=7
    return this.userService.update(id,userId, UpdateUserDto,);
  } 

  @Delete('delete-user/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  } 
  @Post('delete-multiple')
  removeMultiple(@Body('') toDelete: number[]) {
 
    return this.userService.removeMultiple(toDelete);
  } 
}
