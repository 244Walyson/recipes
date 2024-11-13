import { Injectable } from '@nestjs/common';
import { MealType } from 'src/recipe/core/entities/meal-type.entity';
import { IMealTypeRepository } from 'src/recipe/core/interfaces/repositories/meal-type.repository';
import { PrismaService } from 'src/utils/prisma.service';

@Injectable()
export class MealTypeRepository implements IMealTypeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(mealType: MealType): Promise<MealType> {
    return await this.prismaService.mealType.create({
      data: mealType,
    });
  }
  async findById(id: string): Promise<MealType> {
    return await this.prismaService.mealType.findUnique({ where: { id } });
  }
  async findAll(): Promise<MealType[]> {
    return await this.prismaService.mealType.findMany();
  }
  async findByName(name: string): Promise<MealType> {
    return await this.prismaService.mealType.findUnique({
      where: { id: name },
    });
  }
}
