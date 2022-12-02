import { Module } from '@nestjs/common';
import { AplicationService } from './aplication.service';
import { AplicationController } from './aplication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AplicationEntity } from './entities/aplication.entity';

@Module({
  controllers: [AplicationController],
  providers: [AplicationService],
  imports: [TypeOrmModule.forFeature([AplicationEntity])],
})
export class AplicationModule {}
