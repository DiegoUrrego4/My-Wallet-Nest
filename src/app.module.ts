import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { ClientModule } from './client/client.module';
import { AccountModule } from './account/account.module';
import { AplicationModule } from './aplication/aplication.module';
import { MovementModule } from './movement/movement.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ClientModule,
    AccountModule,
    AplicationModule,
    MovementModule,
    TokenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  // exports: ['PG', TypeOrmModule],
})
export class AppModule {}
