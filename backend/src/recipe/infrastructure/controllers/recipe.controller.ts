import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateRecipeUseCase } from 'src/recipe/core/use-cases/recipe/create-recipe.use-case';
import { FindAllRecipeUseCase } from 'src/recipe/core/use-cases/recipe/find-all-recipe.use-case';
import { QueryParamsDto } from '../dto/query-params.dto';
import { IReciperequest } from 'src/recipe/core/interfaces/recipes/recipe-request.interface';
import { FindRecipeByIdUseCase } from 'src/recipe/core/use-cases/recipe/find-recipe-by-id.use-case';
import { UpdateRecipeUseCase } from 'src/recipe/core/use-cases/recipe/update-recipe.use-case';
import { DeleteRecipeUseCase } from 'src/recipe/core/use-cases/recipe/delete-recipe.use-case';

@Controller('recipes')
export class RecipeController {
  constructor(
    private readonly createRecipeUseCase: CreateRecipeUseCase,
    private readonly findALlrecipesUseCase: FindAllRecipeUseCase,
    private readonly findRecipeByIdUseCase: FindRecipeByIdUseCase,
    private readonly updateRecipeUseCase: UpdateRecipeUseCase,
    private readonly deleteRecipeUseCase: DeleteRecipeUseCase,
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

  @Put(':id')
  async updateRecipe(@Param('id') id: string, @Body() dto: IReciperequest) {
    return this.updateRecipeUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteRecipe(@Param('id') id: string) {
    return this.deleteRecipeUseCase.execute(id);
  }

  @Post()
  async createRecipe(@Body() dto: IReciperequest) {
    return this.createRecipeUseCase.execute(dto);
  }
}
