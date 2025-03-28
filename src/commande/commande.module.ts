import { Module } from '@nestjs/common';
import { CommandeService } from './commande.service';
import { CommandeController } from './commande.controller';
import { Commande } from './entities/commande.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CommandeController],
  providers: [CommandeService],
  imports:[TypeOrmModule.forFeature([Commande])]
})
export class CommandeModule {}
