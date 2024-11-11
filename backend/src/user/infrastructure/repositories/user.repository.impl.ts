import { User } from 'src/user/core/entities/user.entity';
import {
  IFindAllParams,
  IUserRepository,
} from 'src/user/core/interfaces/repositories/user-repository.interface';
import { PrismaService } from '../../../utils/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: User): Promise<User> {
    return await this.prismaService.user.create({
      data: user,
    });
  }
  async update(id: string, user: User): Promise<User> {
    return await this.prismaService.user.update({
      where: { id },
      data: user,
    });
  }
  async delete(id: string): Promise<void> {
    await this.prismaService.user.delete({ where: { id } });
  }
  async findById(id: string): Promise<User> {
    return await this.prismaService.user.findUnique({ where: { id } });
  }
  async findByEmail(email: string): Promise<User> {
    return await this.prismaService.user.findUnique({ where: { email } });
  }

  async findAll(
    params: IFindAllParams,
  ): Promise<{ total: number; users: User[] }> {
    const [users, total] = await Promise.all([
      this.prismaService.user.findMany({
        where: {
          name: {
            contains: params.name ? params.name.toLowerCase() : '',
          },
        },
        skip: params.offset,
        take: params.limit,
      }),
      this.prismaService.user.count({
        where: {
          name: {
            contains: params.name ? params.name.toLowerCase() : '',
          },
        },
      }),
    ]);
    return { total, users };
  }
}
