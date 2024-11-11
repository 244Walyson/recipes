import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateAccessTokenUseCase } from 'src/auth/core/use-cases/create-access-token-use-case';
import { RefreshTokenUseCase } from 'src/auth/core/use-cases/refresh-token.use-case';
import { CredentiaslRequestDto } from '../dtos/creadentials-request.dto';
import { AccessTokenResponseDto } from '../dtos/access-token-response.dto';
import { RefreshTokenRequestDto } from '../dtos/refresh-token-request.dto';
import { CreateRecoverPasswordTokenUseCase } from 'src/auth/core/use-cases/create-recover-password-token.use-case';
import { RecovrePassordRequestDto } from '../dtos/recover-password-request.dto';
import { UpdatePasswordUseCase } from 'src/auth/core/use-cases/update-password.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly createAccessTokenUseCase: CreateAccessTokenUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly createRecoverPasswordTokenUseCase: CreateRecoverPasswordTokenUseCase,
    private readonly updatePasswordUseCase: UpdatePasswordUseCase,
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

  @Post('recover-password/token/:email')
  async recoverPasswordToken(@Param() email: string) {
    return this.createRecoverPasswordTokenUseCase.execute(email);
  }

  @Post('recover-password')
  async updatePassword(@Body() dto: RecovrePassordRequestDto) {
    return await this.updatePasswordUseCase.execute(dto);
  }
}
