import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateMovementDto } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/update-movement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MovementEntity } from './entities/movement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MovementService {
  constructor(
    @InjectRepository(MovementEntity)
    private movementRepository: Repository<MovementEntity>,
  ) {}
  async create(createMovementDto: CreateMovementDto) {
    try {
      const movement = this.movementRepository.create(createMovementDto);
      await this.movementRepository.save(movement);
      return movement;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  getLoan(createMovementDto: CreateMovementDto) {
    return 'This action adds a new movement';
  }

  payment(createMovementDto: CreateMovementDto) {
    return 'This action adds a new movement';
  }

  findAll() {
    const movements = this.movementRepository.find();
    return movements;
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
  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    console.error(error);
    throw new InternalServerErrorException(
      'Unexpected error. Check server logs',
    );
  }
}
