import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAplicationDto } from './dto/create-aplication.dto';
import { UpdateAplicationDto } from './dto/update-aplication.dto';
import { AplicationEntity } from './entities/aplication.entity';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

@Injectable()
export class AplicationService {
  constructor(
    @InjectRepository(AplicationEntity)
    private aplicationRepository: Repository<AplicationEntity>,
  ) {}
  changeAppColor(createAplicationDto: CreateAplicationDto) {
    return 'This action adds a new aplication';
  }

  findAll() {
    return this.aplicationRepository.find();
  }

  async findOne(clientId: string) {
    let app: AplicationEntity | null = null;
    if (isUUID(clientId)) {
      app = await this.aplicationRepository.findOneBy({ clientId });
    }
    if (!app)
      throw new NotFoundException(
        `No se encontró una aplicación que corresponda al clientId ${clientId}`,
      );
    return app;
  }

  async update(id: string, updateAplicationDto: UpdateAplicationDto) {
    const app = await this.aplicationRepository.preload({
      id,
      ...updateAplicationDto,
      // updatedAt: new Date().getFullYear(),
    });
    if (!app)
      throw new NotFoundException(`Aplicación con id: ${id} no encontrada`);
    try {
      await this.aplicationRepository.save(app);
      return app;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} aplication`;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    console.error(error);
    throw new InternalServerErrorException(
      'Unexpected error. Check server logs',
    );
  }
}
