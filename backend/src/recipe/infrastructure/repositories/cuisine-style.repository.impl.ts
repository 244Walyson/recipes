import { Injectable } from '@nestjs/common';
import { CuisineStyle } from '@/src/recipe/core/entities/cuisine-style.entity';
import { ICuisineStyleRepository } from 'src/recipe/core/interfaces/repositories/cuisine-style.repository';
import { PrismaService } from 'src/utils/prisma.service';
import { ICuisineStyle } from '../../core/interfaces/cuisine-style/cousine-styles.interface';

@Injectable()
export class CuisineStyleRepository implements ICuisineStyleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(cuisineStyle: CuisineStyle): Promise<ICuisineStyle> {
    return await this.prismaService.cuisineStyle.create({
      data: cuisineStyle,
    });
  }
  async findById(id: string): Promise<ICuisineStyle> {
    return await this.prismaService.cuisineStyle.findUnique({ where: { id } });
  }

  async findAll({
    name,
    offset,
    limit,
  }: {
    name: string;
    offset: number;
    limit: number;
  }): Promise<{ total: number; data: ICuisineStyle[] }> {
    const total = await this.prismaService.cuisineStyle.count({
      where: {
        name: {
          contains: name ?? '',
          mode: 'insensitive',
        },
      },
    });

    const data = await this.prismaService.cuisineStyle.findMany({
      where: {
        name: {
          contains: name ?? '',
          mode: 'insensitive',
        },
      },
      skip: offset,
      take: limit,
    });

    return { total, data };
  }

  async findByName(name: string): Promise<ICuisineStyle> {
    return await this.prismaService.cuisineStyle.findUnique({
      where: { id: name },
    });
  }
}
