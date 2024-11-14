import { CreateAccessTokenUseCase } from '@/src/auth/core/use-cases/create-access-token.use-case';
import { OAuth2AuthenticationUseCase } from '@/src/auth/core/use-cases/oauth2-authentication.use-case';
import { DomainException } from '@/src/recipe/core/exceptions/domain.exception';
import { CreateUserUseCase } from '@/src/user/core/use-cases/create-user.use-case';
import { User } from '@prisma/client';

describe('OAuth2AuthenticationUseCase', () => {
  let useCase: OAuth2AuthenticationUseCase;
  let createUserUseCase: jest.Mocked<CreateUserUseCase>;
  let createAccessTokenUseCase: jest.Mocked<CreateAccessTokenUseCase>;

  beforeEach(() => {
    createUserUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<CreateUserUseCase>;
    createAccessTokenUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<CreateAccessTokenUseCase>;
    useCase = new OAuth2AuthenticationUseCase(
      createUserUseCase,
      createAccessTokenUseCase,
    );
  });

  it('should throw DomainException when an error occurs in createUserUseCase', async () => {
    createUserUseCase.execute = jest
      .fn()
      .mockRejectedValue(new Error('User creation failed'));

    const dto = { email: 'test@example.com', password: 'password123' } as User;

    await expect(useCase.execute(dto)).rejects.toThrow(
      new DomainException('Error generating access token'),
    );
  });
});
