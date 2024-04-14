import { Injectable } from '@nestjs/common';
import { CreatePitchDto } from './dto/create-pitch.dto';
import { UpdatePitchDto } from './dto/update-pitch.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PitchService {
  constructor(private prismaService: PrismaService) {}
  async create(createPitchDto: CreatePitchDto) {
    return await this.prismaService.pitchs.create({
      data: createPitchDto,
    });
  }

  async findAll() {
    return await this.prismaService.pitchs.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.pitchs.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(updatePitchDto: UpdatePitchDto) {
    return await this.prismaService.pitchs.update({
      where: {
        id: updatePitchDto.id,
      },
      data: updatePitchDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.pitchs.delete({
      where: {
        id: id,
      },
    });
  }

  async findPitchByType(id: number) {
    return await this.prismaService.pitchs.findMany({
      where: {
        type_id: id,
      },
    });
  }

  async createPitchType(name: string) {
    return await this.prismaService.pitch_types.create({
      data: {
        name: name,
      },
    });
  }

  async updatePitchType(id: number, name: string) {
    return await this.prismaService.pitch_types.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });
  }

  async removePitchType(id: number) {
    return await this.prismaService.pitch_types.delete({
      where: {
        id: id,
      },
    });
  }
}
