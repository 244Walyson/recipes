import { Injectable } from '@nestjs/common';
import { Recipe } from '@/src/recipe/core/entities/recipe.entity';
import { IFindAllFilters } from '@/src/recipe/core/interfaces/recipes/find-all-filters.interface';
import { IRecipeProjection } from '@/src/recipe/core/interfaces/recipes/recipe-response-projection.interface';
import { IRecipeRepository } from '@/src/recipe/core/interfaces/repositories/recipe.repository';
import { PrismaService } from '@/src/utils/prisma.service';
import { IRecipeResponse } from '../../core/interfaces/recipes/recipe-response.interface';

@Injectable()
export class RecipeRepository implements IRecipeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findFavouritesByUserId({
    id,
    offset,
    limit,
  }: {
    id: string;
    offset: number;
    limit: number;
  }): Promise<{ total: number; data: IRecipeProjection[] }> {
    const favorites = await this.prismaService.favoriteRecipe.findMany({
      where: { userId: id },
      skip: offset,
      take: limit,
      include: {
        recipe: {
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
            user: {
              select: {
                id: true,
                name: true,
                imgUrl: true,
                numberOfRecipes: true,
              },
            },
          },
        },
      },
    });

    const filteredFavorites = favorites.filter(
      (favorite) => favorite.recipe.deleted === false,
    );

    const total = await this.prismaService.favoriteRecipe.count({
      where: { userId: id },
    });

    const data = filteredFavorites.map((favorite) => {
      const recipe = favorite.recipe;
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
        })),
      };
    });

    return { total, data };
  }

  async favouriteRecipe(recipeId: string, userId: string): Promise<void> {
    await this.prismaService.favoriteRecipe.create({
      data: {
        userId,
        recipeId,
      },
    });
    await this.prismaService.recipe.update({
      where: { id: recipeId },
      data: {
        favoriteCount: {
          increment: 1,
        },
      },
    });
  }
  async unfavouriteRecipe(recipeId: string, userId: string): Promise<void> {
    await this.prismaService.favoriteRecipe.delete({
      where: {
        userId_recipeId: {
          userId,
          recipeId,
        },
      },
    });
    await this.prismaService.recipe.update({
      where: { id: recipeId },
      data: {
        favoriteCount: {
          decrement: 1,
        },
      },
    });
  }

  async addViewCount(recipeId: string, userId: string): Promise<void> {
    await this.prismaService.viewRecipe.create({
      data: {
        userId,
        recipeId,
      },
    });
    await this.prismaService.recipe.update({
      where: { id: recipeId },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });
  }

  async create(recipe: Recipe): Promise<IRecipeResponse> {
    console.log('RecipeRepository.create', recipe);
    const data = recipe;
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

  async findbyId(recipeId: string, userId?: string): Promise<IRecipeResponse> {
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
        user: {
          select: { id: true, name: true, imgUrl: true, numberOfRecipes: true },
        },
      },
    });

    const isFavorite = userId
      ? await this.checkIfFavorite(userId, recipe.id)
      : false;
    const isViewed = userId
      ? await this.checkIfViewed(userId, recipe.id)
      : false;

    console.log('RecipeRepository.findbyId', recipe);

    return {
      ...recipe,
      isFavorite,
      isViewed,
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

  async checkIfFavorite(userId: string, recipeId: string): Promise<boolean> {
    const favorite = await this.prismaService.favoriteRecipe.findUnique({
      where: {
        userId_recipeId: {
          userId: userId,
          recipeId: recipeId,
        },
      },
    });
    return favorite !== null;
  }

  async checkIfViewed(userId: string, recipeId: string): Promise<boolean> {
    const view = await this.prismaService.viewRecipe.findUnique({
      where: {
        userId_recipeId: {
          userId: userId,
          recipeId: recipeId,
        },
      },
    });
    return view !== null;
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
    userId?: string,
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

    const formatedData = recipes.map(async (recipe) => ({
      ...recipe,
      isFavorite: userId
        ? await this.checkIfFavorite(userId, recipe.id)
        : false,
      isViewed: userId ? await this.checkIfViewed(userId, recipe.id) : false,
      macronutrients: recipe.macronutrients as Record<string, number>,
      user: { name: recipe.user.name },
    }));

    const data = await Promise.all(formatedData);

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

    const formatedData = recipes.map(async (recipe) => ({
      ...recipe,
      isFavorite: id ? await this.checkIfFavorite(id, recipe.id) : false,
      isViewed: id ? await this.checkIfViewed(id, recipe.id) : false,

      macronutrients: recipe.macronutrients as Record<string, number>,
    }));

    const data = await Promise.all(formatedData);

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
        costEstimate: recipe.costEstimate,
        additionalTips: recipe.additionalTips,
        isPublished: recipe.isPublished,
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
        version: { increment: 1 },
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
