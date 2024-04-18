import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ServiceService {
  constructor(private prismaService: PrismaService) {}
  async create(createServiceDto: CreateServiceDto) {
    return await this.prismaService.services.create({
      data: createServiceDto,
    });
  }

  async findAll() {
    return await this.prismaService.services.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  async update(updateServiceDto: UpdateServiceDto) {
    return await this.prismaService.services.update({
      where: {
        id: updateServiceDto.id,
      },
      data: updateServiceDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.services.delete({
      where: {
        id: id,
      },
    });
  }
}
