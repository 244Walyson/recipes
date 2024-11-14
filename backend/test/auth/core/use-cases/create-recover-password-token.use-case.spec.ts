import { IEmailService } from '@/src/auth/core/interfaces/recover-password/email-service.interface';
import { IRecoveryPasswordRepository } from '@/src/auth/core/interfaces/repositories/recovery-password.repository';
import { CreateRecoverPasswordTokenUseCase } from '@/src/auth/core/use-cases/create-recover-password-token.use-case';
import { ResourceNotFoundException } from '@/src/user/core/exceptions/resource-not-found.exception';
import { FindUserByEmailUseCase } from '@/src/user/core/use-cases/find-user-by-email.use-case';
import { User } from '@prisma/client';

describe('CreateRecoverPasswordTokenUseCase', () => {
  let createRecoverPasswordTokenUseCase: CreateRecoverPasswordTokenUseCase;
  let recoveryPasswordRepositoryMock: jest.Mocked<IRecoveryPasswordRepository>;
  let findUserByEmailUseCaseMock: jest.Mocked<FindUserByEmailUseCase>;
  let emailServiceMock: jest.Mocked<IEmailService>;

  beforeEach(() => {
    recoveryPasswordRepositoryMock = {
      create: jest.fn().mockResolvedValue({ token: 'mockToken' }),
    } as unknown as jest.Mocked<IRecoveryPasswordRepository>;
    findUserByEmailUseCaseMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<FindUserByEmailUseCase>;
    emailServiceMock = { send: jest.fn().mockResolvedValue(undefined) };

    createRecoverPasswordTokenUseCase = new CreateRecoverPasswordTokenUseCase(
      recoveryPasswordRepositoryMock,
      findUserByEmailUseCaseMock,
      emailServiceMock,
    );
  });

  it('Should create a password recover token and send an e-mail', async () => {
    const mockUser = {
      id: '1',
      email: 'user@example.com',
      password: 'mockedPass',
    } as User;

    findUserByEmailUseCaseMock.execute.mockResolvedValue(mockUser);

    const email = { email: 'user@example.com' };
    await createRecoverPasswordTokenUseCase.execute({ email });

    expect(findUserByEmailUseCaseMock.execute).toHaveBeenCalledWith(
      mockUser.email,
    );

    expect(recoveryPasswordRepositoryMock.create).toHaveBeenCalled();

    expect(emailServiceMock.send).toHaveBeenCalledWith({
      to: 'user@example.com',
      subject: 'Instruções para redefinição de senha',
      body: expect.any(String),
    });
  });

  it('Should throw resource not found exception if user was not found', async () => {
    findUserByEmailUseCaseMock.execute.mockRejectedValue(
      new ResourceNotFoundException('User not found'),
    );

    const email = 'nonexistent@example.com';

    try {
      await createRecoverPasswordTokenUseCase.execute({ email });
    } catch (error) {
      expect(error).toEqual(new ResourceNotFoundException('User not found'));
    }
  });

  it('Should generate a valid token', async () => {
    const email = { email: 'user@example.com' };
    const mockUser = { id: '1', email: 'user@example.com' } as User;

    findUserByEmailUseCaseMock.execute.mockResolvedValue(mockUser);

    await createRecoverPasswordTokenUseCase.execute(email);

    expect(recoveryPasswordRepositoryMock.create).toHaveBeenCalled();
  });

  it('deve gerar o corpo do e-mail corretamente', async () => {
    const mockUser = { id: '1', email: 'user@example.com' };
    const token = 'mockToken';
    const resetUrl = `https://yourapp.com/reset-password?token=${token}`;

    const expectedEmailBody = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #4A90E2;">Recuperação de Senha</h2>
        <p>Olá,</p>
        <p>Recebemos uma solicitação para redefinir sua senha. Clique no link abaixo para definir uma nova senha:</p>
        <p>
          <a href="${resetUrl}" style="color: #ffffff; background-color: #4A90E2; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Redefinir Senha</a>
        </p>
        <p>Ou copie e cole o link abaixo no seu navegador:</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p>Se você não solicitou a alteração de senha, por favor ignore este email. Sua senha permanecerá inalterada.</p>
        <p>Atenciosamente,</p>
        <p><strong>Sua equipe de suporte</strong></p>
      </div>
    `;

    // Mock do método send (já configurado no beforeEach)
    await createRecoverPasswordTokenUseCase['sendEmail'](mockUser.email, token);

    // Verificar se o e-mail foi enviado com o corpo correto
    expect(emailServiceMock.send).toHaveBeenCalledWith({
      to: mockUser.email,
      subject: 'Instruções para redefinição de senha',
      body: expectedEmailBody,
    });
  });
});
