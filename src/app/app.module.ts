import { Module } from '@nestjs/common';
import { AplicationService } from './app.service';
import { AplicationController } from './app.controller';

@Module({
  controllers: [AplicationController],
  providers: [AplicationService],
  exports: [AplicationService],
})
export class AplicationModule {}
