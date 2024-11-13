import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Recipe } from 'src/recipe/core/entities/recipe.entity';
import { IFindAllFilters } from 'src/recipe/core/interfaces/recipes/find-all-filters.interface';
import { IRecipeProjection } from 'src/recipe/core/interfaces/recipes/recipe-response-projection.interface';
import { IRecipeRepository } from 'src/recipe/core/interfaces/repositories/recipe.repository';
import { PrismaService } from 'src/utils/prisma.service';

@Injectable()
export class RecipeRepository implements IRecipeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(recipe: Recipe): Promise<Recipe> {
    console.log('RecipeRepository.create', recipe);
    const data = recipe as unknown as Prisma.RecipeCreateInput;
    const createdRecipe = await this.prismaService.recipe.create({
      data: {
        ...data,
        comments: { create: recipe.comments },
        recipeIngredients: {
          createMany: {
            data: recipe.recipeIngredients.map((ingredient) => ({
              ingredientId: ingredient.ingredientId,
              quantity: ingredient.quantity,
              unit: ingredient.unit,
            })),
          },
        },
        mealTypes: {
          createMany: {
            data: recipe.mealTypes.map((mealType) => ({
              mealTypeId: mealType.id,
            })),
          },
        },
        cuisineStyles: {
          createMany: {
            data: recipe.cuisineStyles.map((cuisineStyle) => ({
              cuisineStyleId: cuisineStyle.id,
            })),
          },
        },
      },
    });
    return {
      ...createdRecipe,
      macronutrients: createdRecipe.macronutrients as Record<string, number>,
    };
  }

  async findbyId(recipeId: string): Promise<Recipe> {
    const recipe = await this.prismaService.recipe.findUnique({
      where: { id: recipeId, deleted: false },
      include: {
        recipeIngredients: {
          include: { ingredient: true },
        },
        mealTypes: {
          select: { MealType: { select: { id: true, name: true } } },
        },
        cuisineStyles: {
          select: { CuisineStyle: { select: { id: true, name: true } } },
        },
      },
    });

    if (!recipe) {
      throw new Error('Recipe not found');
    }

    return {
      ...recipe,
      macronutrients: recipe.macronutrients as Record<string, number>,
      mealTypes: recipe.mealTypes.map((item) => item.MealType),
      cuisineStyles: recipe.cuisineStyles.map((item) => item.CuisineStyle),
      recipeIngredients: recipe.recipeIngredients.map((item) => ({
        ...item,
        ingredient: {
          id: item.ingredient.id,
          name: item.ingredient.name,
        },
      })),
    };
  }

  async findAll(
    pageable: { page: number; limit: number },
    filters: IFindAllFilters,
  ): Promise<{ total: number; data: IRecipeProjection[] }> {
    const total = await this.prismaService.recipe.count({
      where: {
        name: {
          contains: filters?.name ? filters.name : '',
          mode: 'insensitive',
        },
        category: filters?.category ? { equals: filters.category } : undefined,
        tags: filters?.tags ? { hasSome: filters.tags } : undefined,
        difficultyLevel: filters?.difficultyLevel
          ? { equals: filters.difficultyLevel }
          : undefined,
        calories: filters?.calories ? { equals: filters.calories } : undefined,
        totalTime: filters?.totalTime
          ? { equals: filters.totalTime }
          : undefined,
        viewCount: filters?.viewCount ? { gte: filters.viewCount } : undefined,
        deleted: false,
      },
    });

    const recipes = await this.prismaService.recipe.findMany({
      select: {
        id: true,
        name: true,
        imgUrl: true,
        difficultyLevel: true,
        tags: true,
        calories: true,
        macronutrients: true,
        totalTime: true,
        servingCount: true,
        viewCount: true,
        favoriteCount: true,
        costEstimate: true,
        version: true,
        user: { select: { name: true } },
      },
      where: {
        name: {
          contains: filters?.name ? filters.name : '',
          mode: 'insensitive',
        },
        category: filters?.category ? { equals: filters.category } : undefined,
        tags: filters?.tags ? { hasSome: filters.tags } : undefined,
        difficultyLevel: filters?.difficultyLevel
          ? { equals: filters.difficultyLevel }
          : undefined,
        calories: filters?.calories ? { equals: filters.calories } : undefined,
        totalTime: filters?.totalTime
          ? { equals: filters.totalTime }
          : undefined,
        viewCount: filters?.viewCount ? { gte: filters.viewCount } : undefined,
        deleted: false,
      },
      skip: (pageable.page - 1) * pageable.limit,
      take: pageable.limit,
    });

    const data = recipes.map((recipe) => ({
      ...recipe,
      macronutrients: recipe.macronutrients as Record<string, number>,
    }));

    return { total, data };
  }

  async update(recipe: Recipe): Promise<Recipe> {
    const updatedRecipe = await this.prismaService.recipe.update({
      where: { id: recipe.id },
      data: recipe as unknown as Prisma.RecipeUpdateInput,
    });

    return {
      ...updatedRecipe,
      macronutrients: updatedRecipe.macronutrients as Record<string, number>,
    };
  }
  async delete(recipeId: string): Promise<void> {
    await this.prismaService.recipe.update({
      where: { id: recipeId },
      data: { deleted: true },
    });
  }
}
