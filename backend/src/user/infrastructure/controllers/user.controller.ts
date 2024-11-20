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
import { CreateUserUseCase } from '@/src/user/core/use-cases/create-user.use-case';
import { UserRequestDto } from '../dto/user-request.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { FindUserByIdlUserUseCase } from '@/src/user/core/use-cases/find-user-by-id.use-case';
import { UpdateUserUseCase } from '@/src/user/core/use-cases/update-user.use-case';
import { FindAllUseCase } from '@/src/user/core/use-cases/find-all-use-case';
import { FollowUserByIdUseCase } from '../../core/use-cases/follow-user-by-id.use-case';
import { UnfollowUserByIdUseCase } from '../../core/use-cases/unfollow-user-by-id.use-case';
import { FindFollowingUsersUseCase } from '../../core/use-cases/find-following-users.use-case';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserByIdlUserUseCase: FindUserByIdlUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly findAllUseCase: FindAllUseCase,
    private readonly followUserUseCase: FollowUserByIdUseCase,
    private readonly unfollowUserUseCase: UnfollowUserByIdUseCase,
    private readonly findFollowingUsersUseCase: FindFollowingUsersUseCase,
  ) {}

  @Post()
  async create(@Body() userDto: UserRequestDto): Promise<UserResponseDto> {
    return await this.createUserUseCase.execute(userDto);
  }

  @Get(':id')
  async findById(@Param() id: { id: string }): Promise<UserResponseDto> {
    return await this.findUserByIdlUserUseCase.execute(id.id);
  }

  @Put(':id')
  async update(
    @Param() id: string,
    @Body() userDto: UserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.updateUserUseCase.execute(id, userDto);
  }

  @Get()
  async findUsers(
    @Query('name') name: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return await this.findAllUseCase.execute({ name, page, limit });
  }

  @Post('follow/:id')
  async follow(@Param() dto: { id: string }) {
    return this.followUserUseCase.execute({
      followerId: 'c4c6513e-51af-41d0-b63b-359eb83fbc52',
      followeeId: dto.id,
    });
  }

  @Delete('unfollow/:id')
  @HttpCode(204)
  async unfollow(@Param() dto: { id: string }) {
    return this.unfollowUserUseCase.execute({
      followerId: 'c4c6513e-51af-41d0-b63b-359eb83fbc52',
      followeeId: dto.id,
    });
  }

  @Get('following/:id')
  async findFollowingUsers(
    @Param() id: { id: string },
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return await this.findFollowingUsersUseCase.execute(id.id, {
      page,
      limit,
    });
  }
}
