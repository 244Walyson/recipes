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
import { FindAllRecipeUseCase } from '@/src/recipe/core/use-cases/recipe/find-all-recipes.use-case';
import { QueryParamsDto } from '../dto/query-params.dto';
import { IReciperequest } from 'src/recipe/core/interfaces/recipes/recipe-request.interface';
import { FindRecipeByIdUseCase } from 'src/recipe/core/use-cases/recipe/find-recipe-by-id.use-case';
import { UpdateRecipeUseCase } from 'src/recipe/core/use-cases/recipe/update-recipe.use-case';
import { DeleteRecipeUseCase } from 'src/recipe/core/use-cases/recipe/delete-recipe.use-case';
import { FindRecipesByUserIdUseCase } from '../../core/use-cases/recipe/find-recipes-by-user-id.use-case';
import { UnfavouriteRecipeUseCase } from '../../core/use-cases/recipe/unfavourite-recipe.use-case';
import { FavouriteRecipeUseCase } from '../../core/use-cases/recipe/favourite-recipe.use-case';
import { ViewCountAddUseCase } from '../../core/use-cases/recipe/view-count-add.use-case';

@Controller('recipes')
export class RecipeController {
  constructor(
    private readonly createRecipeUseCase: CreateRecipeUseCase,
    private readonly findALlrecipesUseCase: FindAllRecipeUseCase,
    private readonly findRecipeByIdUseCase: FindRecipeByIdUseCase,
    private readonly updateRecipeUseCase: UpdateRecipeUseCase,
    private readonly deleteRecipeUseCase: DeleteRecipeUseCase,
    private readonly findRecipesByUserIdUseCase: FindRecipesByUserIdUseCase,
    private readonly favouriteRecipeUseCase: FavouriteRecipeUseCase,
    private readonly unfavouriteRecipeUseCase: UnfavouriteRecipeUseCase,
    private readonly viewCountAddUseCase: ViewCountAddUseCase,
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

  @Get('user/:id')
  async findRecipesByUserId(
    @Param('id') id: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.findRecipesByUserIdUseCase.execute({ id, page, limit });
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

  @Post('favourite/:id')
  async favouriteRecipe(@Param('id') id: string) {
    return this.favouriteRecipeUseCase.execute({
      userId: '31ad0c5c-47f3-499c-8183-60b24a4afe78',
      recipeId: id,
    });
  }

  @Delete('unfavourite/:id')
  @HttpCode(204)
  async unfavouriteRecipe(@Param('id') id: string) {
    return this.unfavouriteRecipeUseCase.execute({
      userId: '31ad0c5c-47f3-499c-8183-60b24a4afe78',
      recipeId: id,
    });
  }

  @Post('view/:id')
  async addViewCount(@Param('id') id: string) {
    return this.viewCountAddUseCase.execute({
      recipeId: id,
      userId: '31ad0c5c-47f3-499c-8183-60b24a4afe78',
    });
  }
}
