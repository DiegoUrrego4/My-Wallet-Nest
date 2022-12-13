import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MovementService } from './movement.service';
import { CreateMovementDto, UpdateMovementDto } from './dto';

@Controller('movements')
export class MovementController {
  constructor(private readonly movementService: MovementService) {}

  @Post()
  create(@Body() createMovementDto: CreateMovementDto) {
    return this.movementService.create(createMovementDto);
  }

  @Post('loans')
  getLoan(@Body() createMovementDto: CreateMovementDto) {
    return this.movementService.getLoan(createMovementDto);
  }

  @Post('payment')
  payment(@Body() createMovementDto: CreateMovementDto) {
    return this.movementService.payment(createMovementDto);
  }

  @Get()
  findMovements() {
    return this.movementService.findAll();
  }
  @Get(':movementId:')
  findOneMovement(@Param('movementId') movementId: string) {
    return this.movementService.findOne(movementId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMovementDto: UpdateMovementDto,
  ) {
    return this.movementService.update(+id, updateMovementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movementService.remove(+id);
  }
}
