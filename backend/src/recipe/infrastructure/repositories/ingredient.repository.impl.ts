import { Injectable } from '@nestjs/common';
import { Ingredient } from 'src/recipe/core/entities/ingredient.entity';
import { IIngredientRepository } from 'src/recipe/core/interfaces/repositories/ingredients.repository';
import { PrismaService } from 'src/utils/prisma.service';
import { IIngredient } from '../../core/interfaces/ingredient/ingredient.interface';

@Injectable()
export class IngredientRepository implements IIngredientRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(ingredient: Ingredient): Promise<IIngredient> {
    return await this.prismaService.ingredient.create({
      data: {
        id: ingredient.id,
        name: ingredient.name,
      },
    });
  }
  async findById(id: string): Promise<IIngredient> {
    return await this.prismaService.ingredient.findUnique({ where: { id } });
  }

  async findAll({
    name,
    offset,
    limit,
  }: {
    name: string;
    offset: number;
    limit: number;
  }): Promise<{ total: number; data: IIngredient[] }> {
    const total = await this.prismaService.ingredient.count({
      where: {
        name: {
          contains: name ?? '',
          mode: 'insensitive',
        },
      },
    });

    const data = await this.prismaService.ingredient.findMany({
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

  async findByName(name: string): Promise<IIngredient> {
    return await this.prismaService.ingredient.findUnique({
      where: { id: name },
    });
  }
}
