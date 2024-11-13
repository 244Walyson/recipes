import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateRecipeUseCase } from 'src/recipe/core/use-cases/recipe/create-recipe.use-case';
import { FindAllRecipeUseCase } from 'src/recipe/core/use-cases/recipe/find-all-recipe.use-case';
import { QueryParamsDto } from '../dto/query-params.dto';
import { IReciperequest } from 'src/recipe/core/interfaces/recipes/recipe-request.interface';

@Controller('recipes')
export class RecipeController {
  constructor(
    private readonly createRecipeUseCase: CreateRecipeUseCase,
    private readonly findALlrecipesUseCase: FindAllRecipeUseCase,
  ) {}

  @Get()
  async findAllRecipes(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query() query: QueryParamsDto,
  ) {
    return this.findALlrecipesUseCase.execute({ page, limit }, query);
  }

  @Post()
  async createRecipe(@Body() dto: IReciperequest) {
    return this.createRecipeUseCase.execute(dto);
  }
}
