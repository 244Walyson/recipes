import { Module } from '@nestjs/common';
import { RecipeController } from './infrastructure/controllers/recipe.controller';
import { RecipeRepository } from './infrastructure/repositories/recipe.repository.impl';
import { FindAllRecipeUseCase } from './core/use-cases/recipe/find-all-recipes.use-case';
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
import { FindMealTypeByIdUseCase } from './core/use-cases/meal-type/find-meal-type-by-id.use-case';
import { IMealTypeRepository } from './core/interfaces/repositories/meal-type.repository';
import { FindRecipeByIdUseCase } from './core/use-cases/recipe/find-recipe-by-id.use-case';
import { UpdateRecipeUseCase } from './core/use-cases/recipe/update-recipe.use-case';
import { DeleteRecipeUseCase } from './core/use-cases/recipe/delete-recipe.use-case';
import { FindAllCuisineStyleUseCase } from './core/use-cases/cuisine-style/find-all-cuisine-style.use-case';
import { FindAllMealTypeUseCase } from './core/use-cases/meal-type/find-all-meal-type.use-case';
import { CreateMealTypeUseCase } from './core/use-cases/meal-type/create-meal-type.use-case';
import { FindAllIngredientUseCase } from './core/use-cases/ingredient/find-all-ingredient.use-case';
import { CreateIngredientUseCase } from './core/use-cases/ingredient/create-ingredient.use-case';
import { IngredinetController } from './infrastructure/controllers/ingredient.controller';
import { CuisineStyleController } from './infrastructure/controllers/cuisine-style.controller';
import { MealTypeController } from './infrastructure/controllers/meal-type.controller';
import { FindRecipesByUserIdUseCase } from './core/use-cases/recipe/find-recipes-by-user-id.use-case';

@Module({
  imports: [],
  controllers: [
    RecipeController,
    IngredinetController,
    CuisineStyleController,
    MealTypeController,
  ],
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
      provide: FindAllMealTypeUseCase,
      useFactory: (mealTypeRepository: IMealTypeRepository) => {
        return new FindAllMealTypeUseCase(mealTypeRepository);
      },
      inject: ['IMealTypeRepository'],
    },
    {
      provide: CreateMealTypeUseCase,
      useFactory: (mealTypeRepository: IMealTypeRepository) => {
        return new CreateMealTypeUseCase(mealTypeRepository);
      },
      inject: ['IMealTypeRepository'],
    },
    {
      provide: FindMealTypeByIdUseCase,
      useFactory: (mealTypeRepository: IMealTypeRepository) => {
        return new FindMealTypeByIdUseCase(mealTypeRepository);
      },
      inject: ['IIngredientRepository'],
    },
    {
      provide: FindAllIngredientUseCase,
      useFactory: (ingredientRepository: IIngredientRepository) => {
        return new FindAllIngredientUseCase(ingredientRepository);
      },
      inject: ['IIngredientRepository'],
    },
    {
      provide: CreateIngredientUseCase,
      useFactory: (ingredientRepository: IIngredientRepository) => {
        return new CreateIngredientUseCase(ingredientRepository);
      },
      inject: ['IIngredientRepository'],
    },
    {
      provide: FindIngredientByIdUseCase,
      useFactory: (ingredientRepository: IIngredientRepository) => {
        return new FindIngredientByIdUseCase(ingredientRepository);
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
      provide: FindAllCuisineStyleUseCase,
      useFactory: (cuisineStyleRepository: ICuisineStyleRepository) => {
        return new FindAllCuisineStyleUseCase(cuisineStyleRepository);
      },
      inject: ['ICuisineStyleRepository'],
    },
    {
      provide: FindAllRecipeUseCase,
      useFactory: (recipeRepository: IRecipeRepository) => {
        return new FindAllRecipeUseCase(recipeRepository);
      },
      inject: ['IRecipeRepository'],
    },
    {
      provide: FindRecipeByIdUseCase,
      useFactory: (recipeRepository: IRecipeRepository) => {
        return new FindRecipeByIdUseCase(recipeRepository);
      },
      inject: ['IRecipeRepository'],
    },
    {
      provide: UpdateRecipeUseCase,
      useFactory: (recipeRepository: IRecipeRepository) => {
        return new UpdateRecipeUseCase(recipeRepository);
      },
      inject: ['IRecipeRepository'],
    },
    {
      provide: DeleteRecipeUseCase,
      useFactory: (recipeRepository: IRecipeRepository) => {
        return new DeleteRecipeUseCase(recipeRepository);
      },
      inject: ['IRecipeRepository'],
    },
    {
      provide: FindRecipesByUserIdUseCase,
      useFactory: (recipeRepository: IRecipeRepository) => {
        return new FindRecipesByUserIdUseCase(recipeRepository);
      },
      inject: ['IRecipeRepository'],
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
