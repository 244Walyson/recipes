import { Injectable } from '@nestjs/common';
import { MealType } from '@/src/recipe/core/entities/meal-type.entity';
import { IMealTypeRepository } from '@/src/recipe/core/interfaces/repositories/meal-type.repository';
import { PrismaService } from '@/src/utils/prisma.service';
import { IMealType } from '../../core/interfaces/meal-type/meal-type.interface';

@Injectable()
export class MealTypeRepository implements IMealTypeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(mealType: MealType): Promise<IMealType> {
    return await this.prismaService.mealType.create({
      data: mealType,
    });
  }
  async findById(id: string): Promise<IMealType> {
    return await this.prismaService.mealType.findUnique({ where: { id } });
  }

  async findAll({
    name,
    offset,
    limit,
  }: {
    name: string;
    offset: number;
    limit: number;
  }): Promise<{ total: number; data: IMealType[] }> {
    const total = await this.prismaService.cuisineStyle.count({
      where: {
        name: {
          contains: name ?? '',
          mode: 'insensitive',
        },
      },
    });

    const data = await this.prismaService.mealType.findMany({
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

  async findByName(name: string): Promise<IMealType> {
    return await this.prismaService.mealType.findUnique({
      where: { id: name },
    });
  }
}
