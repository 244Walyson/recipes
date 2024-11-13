import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { IMealType } from 'src/recipe/core/interfaces/meal-type/meal-type.interface';
import { IPaginatedResponse } from 'src/recipe/core/interfaces/shared/paginated-response.interface';
import { CreateMealTypeUseCase } from 'src/recipe/core/use-cases/meal-type/create-meal-type.use-case';
import { FindAllMealTypeUseCase } from 'src/recipe/core/use-cases/meal-type/find-all-meal-type.use-case';

@Controller('meal-types')
export class MealTypeController {
  constructor(
    private readonly createMealTypeUseCase: CreateMealTypeUseCase,
    private readonly findAllMelaTypesUseCase: FindAllMealTypeUseCase,
  ) {}

  @Get()
  async findAll(
    @Query('name') name: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<IPaginatedResponse<IMealType>> {
    return await this.findAllMelaTypesUseCase.execute({ name, page, limit });
  }

  @Post()
  async create(@Body() dto: IMealType) {
    return await this.createMealTypeUseCase.execute(dto);
  }
}
