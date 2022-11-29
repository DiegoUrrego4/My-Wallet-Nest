import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { AccountModule } from './account/account.module';
import { AplicationModule } from './app/app.module';
import { MovementModule } from './movement/movement.module';

@Module({
  imports: [ClientModule, AccountModule, AplicationModule, MovementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
