import { Module } from '@nestjs/common';
import { DetailCommandeService } from './detail-commande.service';
import { DetailCommandeController } from './detail-commande.controller';
import { DetailCommande } from './entities/detail-commande.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [DetailCommandeController],
  providers: [DetailCommandeService],
  imports:[TypeOrmModule.forFeature([DetailCommande])]
})
export class DetailCommandeModule {}
