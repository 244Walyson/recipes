import { Injectable } from '@nestjs/common';
import { CuisineStyle } from 'src/recipe/core/entities/cousine-style.entity';
import { ICuisineStyleRepository } from 'src/recipe/core/interfaces/repositories/cuisine-style.repository';
import { PrismaService } from 'src/utils/prisma.service';

@Injectable()
export class CuisineStyleRepository implements ICuisineStyleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(cuisineStyle: CuisineStyle): Promise<CuisineStyle> {
    return await this.prismaService.cuisineStyle.create({
      data: cuisineStyle,
    });
  }
  async findById(id: string): Promise<CuisineStyle> {
    return await this.prismaService.cuisineStyle.findUnique({ where: { id } });
  }
  async findAll(): Promise<CuisineStyle[]> {
    return await this.prismaService.cuisineStyle.findMany();
  }
  async findByName(name: string): Promise<CuisineStyle> {
    return await this.prismaService.cuisineStyle.findUnique({
      where: { id: name },
    });
  }
}
