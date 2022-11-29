import { Module } from '@nestjs/common';
import { AplicationService } from './aplication.service';
import { AplicationController } from './aplication.controller';

@Module({
  controllers: [AplicationController],
  providers: [AplicationService]
})
export class AplicationModule {}
