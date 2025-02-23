import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { LivreurModule } from './livreur/livreur.module';
import { ProduitsModule } from './produits/produits.module';
import { CategoryModule } from './category/category.module';
import { MarksModule } from './marks/marks.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'livraison',
        autoLoadEntities: true,
        synchronize: true,
      }),
  
}),
    UserModule,
    AuthModule,
    ClientModule,
    LivreurModule,
    ProduitsModule,
    CategoryModule,
    MarksModule,
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}



