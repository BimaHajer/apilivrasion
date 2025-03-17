import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LivreurService } from './livreur.service';
import { LivreurController } from './livreur.controller';
import { Livreur } from './entities/livreur.entity';

@Module({
  controllers: [LivreurController],
  providers: [LivreurService],
 exports: [LivreurService,TypeOrmModule],
imports:[TypeOrmModule.forFeature([Livreur])]
})
export class LivreurModule {}
