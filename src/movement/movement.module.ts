import { ClientService } from './../client/client.service';
import { Module } from '@nestjs/common';
import { MovementService } from './movement.service';
import { MovementController } from './movement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../client/entities/client.entity';
import { AccountEntity } from '../account/entities/account.entity';
import { AplicationEntity } from '../aplication/entities/aplication.entity';
import { TokenEntity } from '../token/entities/token.entity';
import { MovementEntity } from './entities/movement.entity';
import { AccountService } from '../account/account.service';

@Module({
  controllers: [MovementController],
  providers: [MovementService, AccountService, ClientService],
  exports: [MovementService],
  imports: [
    TypeOrmModule.forFeature([
      ClientEntity,
      AccountEntity,
      AplicationEntity,
      TokenEntity,
      MovementEntity,
    ]),
  ],
})
export class MovementModule {}
