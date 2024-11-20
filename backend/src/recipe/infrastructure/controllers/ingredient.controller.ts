import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { IIngredient } from '@/src/recipe/core/interfaces/ingredient/ingredient.interface';
import { IPaginatedResponse } from '@/src/recipe/core/interfaces/shared/paginated-response.interface';
import { CreateIngredientUseCase } from '@/src/recipe/core/use-cases/ingredient/create-ingredient.use-case';
import { FindAllIngredientUseCase } from '@/src/recipe/core/use-cases/ingredient/find-all-ingredient.use-case';

@Controller('ingredients')
export class IngredinetController {
  constructor(
    private readonly createIngredientUseCase: CreateIngredientUseCase,
    private readonly findAllIngredientUseCase: FindAllIngredientUseCase,
  ) {}

  @Get()
  async findAll(
    @Query('name') name: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<Promise<IPaginatedResponse<IIngredient>>> {
    return await this.findAllIngredientUseCase.execute({ name, page, limit });
  }

  @Post()
  async create(@Body() dto: IIngredient): Promise<IIngredient> {
    return await this.createIngredientUseCase.execute(dto);
  }
}
