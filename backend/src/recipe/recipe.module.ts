import { Module } from '@nestjs/common';
import { RecipeController } from './infrastructure/controllers/recipe.controller';
import { RecipeRepository } from './infrastructure/repositories/recipe.repository.impl';
import { FindAllRecipeUseCase } from './core/use-cases/recipe/find-all-recipe.use-case';
import { IRecipeRepository } from './core/interfaces/repositories/recipe.repository';
import { CreateRecipeUseCase } from './core/use-cases/recipe/create-recipe.use-case';
import { PrismaService } from 'src/utils/prisma.service';
import { FindIngredientByIdUseCase } from './core/use-cases/ingredient/find-ingredient-by-id.use-case';
import { ingredientRepository } from './infrastructure/repositories/ingredient.repository.impl';
import { MealTypeRepository } from './infrastructure/repositories/meal-type.repository.impl';
import { CuisineStyleRepository } from './infrastructure/repositories/cuisine-style.repository.impl';
import { IIngredientRepository } from './core/interfaces/repositories/ingredients.repository';
import { ICuisineStyleRepository } from './core/interfaces/repositories/cuisine-style.repository';
import { CreateCuisineStyleUseCase } from './core/use-cases/cuisine-style/create-cuisine-styles.use-case';
import { FindCuisineStyleByIdUseCase } from './core/use-cases/cuisine-style/find-cuisine-style-by-id.use-case';
import { FindMealTypeByIdUseCase } from './core/use-cases/meal-type/find-cuisine-style-by-id.use-case';
import { IMealTypeRepository } from './core/interfaces/repositories/meal-type.repository';

@Module({
  imports: [],
  controllers: [RecipeController],
  providers: [
    PrismaService,
    {
      provide: 'IRecipeRepository',
      useClass: RecipeRepository,
    },
    {
      provide: 'IIngredientRepository',
      useClass: ingredientRepository,
    },
    {
      provide: 'IMealTypeRepository',
      useClass: MealTypeRepository,
    },
    {
      provide: 'ICuisineStyleRepository',
      useClass: CuisineStyleRepository,
    },
    {
      provide: FindAllRecipeUseCase,
      useFactory: (recipeRepository: IRecipeRepository) => {
        return new FindAllRecipeUseCase(recipeRepository);
      },
      inject: ['IRecipeRepository'],
    },
    {
      provide: FindIngredientByIdUseCase,
      useFactory: (ingredientRepository: IIngredientRepository) => {
        return new FindIngredientByIdUseCase(ingredientRepository);
      },
      inject: ['IIngredientRepository'],
    },
    {
      provide: FindMealTypeByIdUseCase,
      useFactory: (mealTypeRepository: IMealTypeRepository) => {
        return new FindMealTypeByIdUseCase(mealTypeRepository);
      },
      inject: ['IIngredientRepository'],
    },
    {
      provide: FindCuisineStyleByIdUseCase,
      useFactory: (cuisineStyleRepository: ICuisineStyleRepository) => {
        return new FindCuisineStyleByIdUseCase(cuisineStyleRepository);
      },
      inject: ['ICuisineStyleRepository'],
    },
    {
      provide: CreateCuisineStyleUseCase,
      useFactory: (cuisineStyleRepository: ICuisineStyleRepository) => {
        return new CreateCuisineStyleUseCase(cuisineStyleRepository);
      },
      inject: ['ICuisineStyleRepository'],
    },
    {
      provide: CreateCuisineStyleUseCase,
      useFactory: (cuisineStyleRepository: ICuisineStyleRepository) => {
        return new CreateCuisineStyleUseCase(cuisineStyleRepository);
      },
      inject: ['ICuisineStyleRepository'],
    },
    {
      provide: CreateRecipeUseCase,
      useFactory: (
        recipeRepository: IRecipeRepository,
        findMealTypeByidUseCase: FindMealTypeByIdUseCase,
        findIngredientByIdUseCase: FindIngredientByIdUseCase,
        findCuisineStyleByIdUseCase: FindCuisineStyleByIdUseCase,
      ) => {
        return new CreateRecipeUseCase(
          recipeRepository,
          findMealTypeByidUseCase,
          findCuisineStyleByIdUseCase,
          findIngredientByIdUseCase,
        );
      },
      inject: [
        'IRecipeRepository',
        FindMealTypeByIdUseCase,
        FindIngredientByIdUseCase,
        FindCuisineStyleByIdUseCase,
      ],
    },
  ],
  exports: [],
})
export class RecipeModule {}
