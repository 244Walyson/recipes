import { IAccessToken } from '../interfaces/access-token/acces-token.interface';
import { CreateUserUseCase } from 'src/user/core/use-cases/create-user.use-case';
import { CreateAccessTokenUseCase } from './create-access-token-use-case';
import { IUserRequest } from 'src/user/core/interfaces/user/user-request.interface';

export class OAuth2AuthenticationUseCase {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly createAccessTokenUseCase: CreateAccessTokenUseCase,
  ) {}

  async execute(dto: IUserRequest): Promise<IAccessToken> {
    console.log('OAuth2AuthenticationUseCase.execute', dto);
    console.log(
      'OAuth2AuthenticationUseCase.createUserUseCase',
      this.createUserUseCase,
    );

    const user = await this.createUserUseCase.execute(dto);

    return this.generateAccesToken(user.email);
  }

  private async generateAccesToken(email: string): Promise<IAccessToken> {
    return this.createAccessTokenUseCase.execute(
      { email, password: undefined },
      false,
    );
  }
}
