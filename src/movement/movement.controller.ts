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
import { CreateMovementDto, CreatePaymentDto, UpdateMovementDto } from './dto';

@Controller('movements')
export class MovementController {
  constructor(private readonly movementService: MovementService) {}

  @Post()
  create(@Body() createMovementDto: CreateMovementDto) {
    return this.movementService.create(createMovementDto);
  }

  @Post('loans')
  getLoan(@Body() createPaymentDto: CreatePaymentDto) {
    return this.movementService.getLoan(createPaymentDto);
  }

  @Post('payment')
  payment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.movementService.payment(createPaymentDto);
  }

  @Get('movement/:movementId:')
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
