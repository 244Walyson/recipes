import { Body, Controller, Post } from '@nestjs/common';
import { CreateAccessTokenUseCase } from 'src/auth/core/use-cases/create-access-token-use-case';
import { RefreshTokenUseCase } from 'src/auth/core/use-cases/refresh-token.use-case';
import { CredentiaslRequestDto } from '../dtos/creadentials-request.dto';
import { AccessTokenResponseDto } from '../dtos/access-token-response.dto';
import { RefreshTokenRequestDto } from '../dtos/refresh-token-request.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly createAccessTokenUseCase: CreateAccessTokenUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @Post('token')
  async AccessToken(
    @Body() credentialDto: CredentiaslRequestDto,
  ): Promise<AccessTokenResponseDto> {
    return await this.createAccessTokenUseCase.execute(credentialDto);
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenRequestDto,
  ): Promise<AccessTokenResponseDto> {
    return await this.refreshTokenUseCase.execute(refreshTokenDto);
  }
}
