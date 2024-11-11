import { FindUserByEmailUserUseCase } from 'src/user/core/use-cases/find-user-by-email.use-case';
import { IJwtService } from '../interfaces/jwt/jwt.service.interface';
import { CreateRefreshTokenUseCase } from './create-refresh-toke.use-case';
import { ICreadentials } from '../interfaces/access-token/credentials.interface';
import { IPasswordEncoder } from 'src/auth/core/interfaces/utils/password-encoder.interface';
import { UnauthorizedException } from '../exceptions/unuthorized.exceptions';
import { jwtConstants } from '../contants/jwt-contants';
import { IAccessToken } from '../interfaces/access-token/acces-token.interface';

export class CreateAccessTokenUseCase {
  constructor(
    private readonly findUserByEmail: FindUserByEmailUserUseCase,
    private readonly jwtService: IJwtService,
    private readonly passwordEncoder: IPasswordEncoder,
    private readonly createRefreshTokenUseCase: CreateRefreshTokenUseCase,
  ) {}

  async execute(
    credentials: ICreadentials,
    withPassword: boolean = true,
  ): Promise<IAccessToken> {
    const { email, password } = credentials;

    const user = await this.findUserByEmail.execute(email);

    if (withPassword) {
      this.validatePassword(password, user.password);
    }

    const access_token = await this.getAccessToken(user.id, user.email);
    const refresh_token = await this.getRefreshToken(user.id, user.email);
    const expires_in = jwtConstants.expiresIn;

    return { access_token, token_type: 'Bearer', expires_in, refresh_token };
  }

  private async getAccessToken(userId: string, email: string) {
    const payload = { sub: userId, email: email };
    const access_token = this.jwtService.sign(payload);
    return access_token;
  }

  private async getRefreshToken(userId: string, email: string) {
    const { refresh_token } = await this.createRefreshTokenUseCase.execute({
      userId,
      email,
    });
    return refresh_token;
  }

  private async validatePassword(password: string, hashedPassword: string) {
    const passwordMatch = await this.passwordEncoder.compare(
      password,
      hashedPassword,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
