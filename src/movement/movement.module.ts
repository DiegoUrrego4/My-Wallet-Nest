import { Module } from '@nestjs/common';
import { MovementService } from './movement.service';
import { MovementController } from './movement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../client/entities/client.entity';
import { AccountEntity } from '../account/entities/account.entity';
import { AplicationEntity } from '../aplication/entities/aplication.entity';
import { TokenEntity } from '../token/entities/token.entity';
import { MovementEntity } from './entities/movement.entity';

@Module({
  controllers: [MovementController],
  providers: [MovementService],
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
