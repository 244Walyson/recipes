import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from 'src/user/core/use-cases/create-user.use-case';
import { ControllerAdvice } from './controller-advice/controller.advice';
import { UserRequestDto } from '../dto/user-request.dto';
import { UserResponseDto } from '../dto/user-response.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly controllerAdvice: ControllerAdvice,
  ) {}

  @Post()
  async create(@Body() userDto: UserRequestDto): Promise<UserResponseDto> {
    return await this.createUserUseCase.execute(userDto);
  }
}
