import { Module } from '@nestjs/common';
import { SupermarchéService } from './supermarché.service';
import { SupermarchéController } from './supermarché.controller';
import { Supermarché } from './entities/supermarché.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
   imports: [TypeOrmModule.forFeature([Supermarché])],
  controllers: [SupermarchéController],
  providers: [SupermarchéService],
})
export class SupermarchéModule {}
