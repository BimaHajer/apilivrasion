import { Module } from '@nestjs/common';
import { MarksService } from './marks.service';
import { MarksController } from './marks.controller';
import { Mark } from './entities/mark.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [MarksController],
  providers: [MarksService],
  imports:[TypeOrmModule.forFeature([Mark])] 
})
export class MarksModule {}
