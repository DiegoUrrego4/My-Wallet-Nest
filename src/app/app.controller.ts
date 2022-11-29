import { Controller } from '@nestjs/common';
import { AplicationService } from './app.service';

@Controller('app')
export class AplicationController {
  constructor(private readonly appService: AplicationService) {}
}
