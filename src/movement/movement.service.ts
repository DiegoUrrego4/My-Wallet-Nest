import { Injectable } from '@nestjs/common';
import { CreateMovementDto } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/update-movement.dto';

@Injectable()
export class MovementService {
  create(createMovementDto: CreateMovementDto) {
    return 'This action adds a new movement';
  }

  getLoan(createMovementDto: CreateMovementDto) {
    return 'This action adds a new movement';
  }

  payment(createMovementDto: CreateMovementDto) {
    return 'This action adds a new movement';
  }

  findAll() {
    return `This action returns all movement`;
  }

  findOne(id: string) {
    return `This action returns a #${id} movement`;
  }

  findAvailableCapacity(id: string) {
    return `This action returns a #${id} available capacity`;
  }

  update(id: number, updateMovementDto: UpdateMovementDto) {
    return `This action updates a #${id} movement`;
  }

  remove(id: number) {
    return `This action removes a #${id} movement`;
  }
}
