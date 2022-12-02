import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './entities/client.entity';
import { MovementEntity } from '../movement/entities/movement.entity';
import { TokenEntity } from '../token/entities/token.entity';
import { AccountEntity } from '../account/entities/account.entity';
import { AplicationEntity } from '../aplication/entities/aplication.entity';

@Module({
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService],
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
export class ClientModule {}
