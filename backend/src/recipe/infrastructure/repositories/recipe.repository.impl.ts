import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Recipe } from 'src/recipe/core/entities/recipe.entity';
import { IFindAllFilters } from 'src/recipe/core/interfaces/recipes/find-all-filters.interface';
import { IRecipeProjection } from 'src/recipe/core/interfaces/recipes/recipe-response-projection.interface';
import { IRecipeRepository } from 'src/recipe/core/interfaces/repositories/recipe.repository';
import { PrismaService } from 'src/utils/prisma.service';
import { IRecipeResponse } from '../../core/interfaces/recipes/recipe-response.interface';

@Injectable()
export class RecipeRepository implements IRecipeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(recipe: Recipe): Promise<IRecipeResponse> {
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
      preparationMethod: createdRecipe.preparationMethod as any,
    };
  }

  async findbyId(recipeId: string): Promise<IRecipeResponse> {
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
        user: { select: { id: true, name: true, imgUrl: true } },
      },
    });

    if (!recipe) {
      throw new Error('Recipe not found');
    }

    return {
      ...recipe,
      macronutrients: recipe.macronutrients as Record<string, number>,
      mealTypes: recipe.mealTypes.map((item) => item.MealType),
      preparationMethod: recipe.preparationMethod as any,
      cuisineStyles: recipe.cuisineStyles.map((item) => item.CuisineStyle),
      recipeIngredients: recipe.recipeIngredients.map((item) => ({
        id: item.ingredient.id,
        name: item.ingredient.name,
        quantity: item.quantity,
        unit: item.unit,
      })),
    };
  }

  async findAll(
    {
      offset,
      limit,
    }: {
      offset: number;
      limit: number;
    },
    filters: IFindAllFilters,
  ): Promise<{ total: number; data: IRecipeProjection[] }> {
    const total = await this.prismaService.recipe.count({
      where: {
        name: {
          contains: filters?.name ? filters.name : '',
          mode: 'insensitive',
        },

        recipeIngredients:
          filters?.ingredients && filters.ingredients.length > 0
            ? {
                some: {
                  ingredient: {
                    name: { in: filters.ingredients, mode: 'insensitive' },
                  },
                },
              }
            : undefined,

        cuisineStyles: filters?.cuisineStyle
          ? {
              some: {
                CuisineStyle: {
                  name: { equals: filters.cuisineStyle },
                },
              },
            }
          : undefined,

        servingCount: filters?.servingSize
          ? { equals: parseInt(filters.servingSize, 10) }
          : undefined,
        preparationTime:
          filters?.totalTime &&
          !isNaN(filters.totalTime[0]) &&
          !isNaN(filters.totalTime[1])
            ? {
                gte: filters.totalTime[0],
                lte: filters.totalTime[1],
              }
            : undefined,
        viewCount: filters?.viewCount ? { gte: filters.viewCount } : undefined,
        NOT: {
          allergens: filters?.allergens
            ? {
                hasSome: filters?.allergens.map((allergen) =>
                  allergen
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, ''),
                ),
              }
            : undefined,
        },

        deleted: false,
      },
    });

    const recipes = await this.prismaService.recipe.findMany({
      select: {
        id: true,
        name: true,
        imgUrl: true,
        difficultyLevel: true,
        calories: true,
        macronutrients: true,
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

        recipeIngredients:
          filters?.ingredients && filters.ingredients.length > 0
            ? {
                some: {
                  ingredient: {
                    name: { in: filters.ingredients, mode: 'insensitive' },
                  },
                },
              }
            : undefined,

        cuisineStyles: filters?.cuisineStyle
          ? {
              some: {
                CuisineStyle: {
                  name: { equals: filters.cuisineStyle },
                },
              },
            }
          : undefined,

        servingCount: filters?.servingSize
          ? { equals: parseInt(filters.servingSize, 10) }
          : undefined,
        preparationTime:
          filters?.totalTime &&
          !isNaN(filters.totalTime[0]) &&
          !isNaN(filters.totalTime[1])
            ? {
                gte: filters.totalTime[0],
                lte: filters.totalTime[1],
              }
            : undefined,
        viewCount: filters?.viewCount ? { gte: filters.viewCount } : undefined,
        NOT: {
          allergens: filters?.allergens
            ? {
                hasSome: filters?.allergens.map((allergen) =>
                  allergen
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, ''),
                ),
              }
            : undefined,
        },

        deleted: false,
      },
      skip: offset,
      take: limit,
    });

    const data = recipes.map((recipe) => ({
      ...recipe,
      macronutrients: recipe.macronutrients as Record<string, number>,
      user: { name: recipe.user.name },
    }));

    return { total, data };
  }

  async findRecipesByUserId({
    id,
    offset,
    limit,
  }: {
    id: string;
    offset: number;
    limit: number;
  }) {
    const total = await this.prismaService.recipe.count({
      where: {
        userId: id,
        deleted: false,
      },
    });

    const recipes = await this.prismaService.recipe.findMany({
      select: {
        id: true,
        name: true,
        imgUrl: true,
        difficultyLevel: true,
        calories: true,
        macronutrients: true,
        servingCount: true,
        viewCount: true,
        favoriteCount: true,
        costEstimate: true,
        version: true,
        user: { select: { name: true } },
      },
      where: {
        userId: id,
        deleted: false,
      },
      skip: offset,
      take: limit,
    });

    const data = recipes.map((recipe) => ({
      ...recipe,
      macronutrients: recipe.macronutrients as Record<string, number>,
    }));

    return { total, data };
  }

  async update(id: string, recipe: Recipe): Promise<IRecipeResponse> {
    const updatedRecipe = await this.prismaService.recipe.update({
      where: { id },
      data: {
        name: recipe.name,
        preparationMethod: recipe.preparationMethod,
        preparationTime: recipe.preparationTime,
        imgUrl: recipe.imgUrl,
        macronutrients: recipe.macronutrients,
        allergens: recipe.allergens,
        servingCount: recipe.servingCount,
        viewCount: recipe.viewCount,
        favoriteCount: recipe.favoriteCount,
        averageRating: recipe.averageRating,
        costEstimate: recipe.costEstimate,
        additionalTips: recipe.additionalTips,
        isPublished: recipe.isPublished,
        version: recipe.version,
        updatedAt: new Date(),
        recipeIngredients: {
          connect: recipe.recipeIngredients.map((ingredient) => ({
            recipeId_ingredientId: {
              recipeId: id,
              ingredientId: ingredient.ingredientId,
            },
          })),
        },
        mealTypes: {
          connect: recipe.mealTypes.map((mealType) => ({
            recipeId_mealTypeId: {
              recipeId: id,
              mealTypeId: mealType.id,
            },
          })),
        },
        cuisineStyles: {
          connect: recipe.cuisineStyles.map((cuisineStyle) => ({
            recipeId_cuisineStyleId: {
              recipeId: id,
              cuisineStyleId: cuisineStyle.id,
            },
          })),
        },
      },
    });

    return {
      ...updatedRecipe,
      macronutrients: updatedRecipe.macronutrients as Record<string, number>,
      preparationMethod: updatedRecipe.preparationMethod as any,
    };
  }
  async delete(recipeId: string): Promise<void> {
    await this.prismaService.recipe.update({
      where: { id: recipeId },
      data: { deleted: true },
    });
  }
}
