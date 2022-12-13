import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../client/entities/client.entity';
import { AccountEntity } from './entities/account.entity';
import { AplicationEntity } from '../aplication/entities/aplication.entity';
import { TokenEntity } from '../token/entities/token.entity';
import { MovementEntity } from '../movement/entities/movement.entity';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
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
export class AccountModule {}
