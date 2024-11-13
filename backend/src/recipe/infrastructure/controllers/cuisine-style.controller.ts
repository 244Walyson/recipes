import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ICuisineStyle } from 'src/recipe/core/interfaces/cuisine-style/cousine-styles.interface';
import { IPaginatedResponse } from 'src/recipe/core/interfaces/shared/paginated-response.interface';
import { CreateCuisineStyleUseCase } from 'src/recipe/core/use-cases/cuisine-style/create-cuisine-styles.use-case';
import { FindAllCuisineStyleUseCase } from 'src/recipe/core/use-cases/cuisine-style/find-all-cuisine-style.use-case';

@Controller('cuisine-styles')
export class CuisineStyleController {
  constructor(
    private readonly createCuisineStyleUseCase: CreateCuisineStyleUseCase,
    private readonly findAllCuisineStyleUseCase: FindAllCuisineStyleUseCase,
  ) {}

  @Get()
  async findAll(
    @Query('name') name: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<Promise<IPaginatedResponse<ICuisineStyle>>> {
    return await this.findAllCuisineStyleUseCase.execute({ name, page, limit });
  }

  @Post()
  async create(@Body() dto: ICuisineStyle): Promise<ICuisineStyle> {
    return await this.createCuisineStyleUseCase.execute(dto);
  }
}
