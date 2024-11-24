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
  Request,
} from '@nestjs/common';
import { CreateRecipeUseCase } from '@/src/recipe/core/use-cases/recipe/create-recipe.use-case';
import { FindAllRecipeUseCase } from '@/src/recipe/core/use-cases/recipe/find-all-recipes.use-case';
import { QueryParamsDto } from '../dto/query-params.dto';
import { IReciperequest } from '@/src/recipe/core/interfaces/recipes/recipe-request.interface';
import { FindRecipeByIdUseCase } from '@/src/recipe/core/use-cases/recipe/find-recipe-by-id.use-case';
import { UpdateRecipeUseCase } from '@/src/recipe/core/use-cases/recipe/update-recipe.use-case';
import { DeleteRecipeUseCase } from '@/src/recipe/core/use-cases/recipe/delete-recipe.use-case';
import { FindRecipesByUserIdUseCase } from '../../core/use-cases/recipe/find-recipes-by-user-id.use-case';
import { UnfavouriteRecipeUseCase } from '../../core/use-cases/recipe/unfavourite-recipe.use-case';
import { FavouriteRecipeUseCase } from '../../core/use-cases/recipe/favourite-recipe.use-case';
import { ViewCountAddUseCase } from '../../core/use-cases/recipe/view-count-add.use-case';
import { FindFavouritesByUserIdUseCase } from '../../core/use-cases/recipe/find-favourites-by-user-id.use-case';

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
    private readonly findFavouritesByUserIdUseCase: FindFavouritesByUserIdUseCase,
  ) {}

  @Get()
  async findAllRecipes(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query() query: QueryParamsDto,
    @Request() req,
  ) {
    const userId = req.user.sub;
    return this.findALlrecipesUseCase.execute({ page, limit }, query, userId);
  }

  @Get(':recipeId')
  async findRecipeById(@Param('recipeId') recipeId: string, @Request() req) {
    const userId = req.user.sub;
    return this.findRecipeByIdUseCase.execute(recipeId, userId);
  }

  @Get('user/:userId')
  async findRecipesByUserId(
    @Param('userId') userId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.findRecipesByUserIdUseCase.execute({ id: userId, page, limit });
  }

  @Put(':recipeId')
  async updateRecipe(
    @Param('recipeId') recipeId: string,
    @Body() dto: IReciperequest,
  ) {
    return this.updateRecipeUseCase.execute(recipeId, dto);
  }

  @Delete(':recipeId')
  @HttpCode(204)
  async deleteRecipe(@Param('id') recipeId: string) {
    return this.deleteRecipeUseCase.execute(recipeId);
  }

  @Post()
  async createRecipe(@Body() dto: IReciperequest) {
    return this.createRecipeUseCase.execute(dto);
  }

  @Get('favourites/:userId')
  async getFavouritesbyUserId(
    @Param('userId') userId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.findFavouritesByUserIdUseCase.execute({
      id: userId,
      page,
      limit,
    });
  }

  @Post('favourite/:recipeId')
  async favouriteRecipe(@Param('recipeId') recipeId: string, @Request() req) {
    const userId = req.user.sub;
    console.log(userId);
    console.log(recipeId);
    return this.favouriteRecipeUseCase.execute({
      recipeId: recipeId,
      userId: userId,
    });
  }

  @Delete('unfavourite/:recipeId')
  @HttpCode(204)
  async unfavouriteRecipe(@Param('recipeId') recipeId: string, @Request() req) {
    const userId = req.user.sub;
    return this.unfavouriteRecipeUseCase.execute({
      recipeId: recipeId,
      userId: userId,
    });
  }

  @Post('view/:recipeId')
  async addViewCount(@Param('recipeId') recipeId: string, @Request() req) {
    const userId = req.user.sub;
    return this.viewCountAddUseCase.execute({
      recipeId: recipeId,
      userId: userId,
    });
  }
}
