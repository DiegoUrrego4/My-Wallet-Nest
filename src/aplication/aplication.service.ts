import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAplicationDto } from './dto/create-aplication.dto';
import { UpdateAplicationDto } from './dto/update-aplication.dto';
import { AplicationEntity } from './entities/aplication.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AplicationService {
  constructor(
    @InjectRepository(AplicationEntity)
    private aplicationRepository: Repository<AplicationEntity>,
  ) {}
  changeAppColor(createAplicationDto: CreateAplicationDto) {
    return 'This action adds a new aplication';
  }

  findAppColor() {
    return { color: 'blue' };
  }

  findOne(id: number) {
    return `This action returns a #${id} aplication`;
  }

  update(id: number, updateAplicationDto: UpdateAplicationDto) {
    return `This action updates a #${id} aplication`;
  }

  remove(id: number) {
    return `This action removes a #${id} aplication`;
  }
}
