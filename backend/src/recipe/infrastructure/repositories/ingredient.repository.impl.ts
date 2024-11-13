import { Injectable } from '@nestjs/common';
import { Ingredient } from 'src/recipe/core/entities/ingredient.entity';
import { IIngredientRepository } from 'src/recipe/core/interfaces/repositories/ingredients.repository';
import { PrismaService } from 'src/utils/prisma.service';

@Injectable()
export class ingredientRepository implements IIngredientRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(ingredient: Ingredient): Promise<Ingredient> {
    return await this.prismaService.ingredient.create({
      data: {
        id: ingredient.id,
        name: ingredient.name,
      },
    });
  }
  async findById(id: string): Promise<Ingredient> {
    return await this.prismaService.ingredient.findUnique({ where: { id } });
  }
  async findAll(): Promise<Ingredient[]> {
    return await this.prismaService.ingredient.findMany();
  }
  async findByName(name: string): Promise<Ingredient> {
    return await this.prismaService.ingredient.findUnique({
      where: { id: name },
    });
  }
}
