import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientController } from './client.controller';
import { Client } from './entities/client.entity';

@Module({
  controllers: [ClientController],
  providers: [ClientService],
   exports: [ClientService,TypeOrmModule],
  imports:[TypeOrmModule.forFeature([Client])]
})
export class ClientModule {}
