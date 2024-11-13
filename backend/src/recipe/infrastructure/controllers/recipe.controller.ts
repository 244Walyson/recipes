import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateRecipeUseCase } from 'src/recipe/core/use-cases/recipe/create-recipe.use-case';
import { FindAllRecipeUseCase } from 'src/recipe/core/use-cases/recipe/find-all-recipe.use-case';
import { QueryParamsDto } from '../dto/query-params.dto';
import { IReciperequest } from 'src/recipe/core/interfaces/recipes/recipe-request.interface';
import { FindRecipeByIdUseCase } from 'src/recipe/core/use-cases/recipe/find-recipe-by-id.use-case';

@Controller('recipes')
export class RecipeController {
  constructor(
    private readonly createRecipeUseCase: CreateRecipeUseCase,
    private readonly findALlrecipesUseCase: FindAllRecipeUseCase,
    private readonly findRecipeByIdUseCase: FindRecipeByIdUseCase,
  ) {}

  @Get()
  async findAllRecipes(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query() query: QueryParamsDto,
  ) {
    return this.findALlrecipesUseCase.execute({ page, limit }, query);
  }

  @Get(':id')
  async findRecipeById(@Param('id') id: string) {
    return this.findRecipeByIdUseCase.execute(id);
  }

  @Post()
  async createRecipe(@Body() dto: IReciperequest) {
    return this.createRecipeUseCase.execute(dto);
  }
}
