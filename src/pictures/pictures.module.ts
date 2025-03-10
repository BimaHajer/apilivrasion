import { Module } from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { PicturesController } from './pictures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Picture } from './entities/picture.entity';

@Module({
  controllers: [PicturesController],
  providers: [PicturesService],
  imports:[TypeOrmModule.forFeature([Picture])]
})
export class PicturesModule {}
