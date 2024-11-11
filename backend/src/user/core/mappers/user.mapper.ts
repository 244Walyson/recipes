// src/core/mappers/user.mapper.ts
import { IUserRequest } from '../interfaces/user-request.interface';
import { User } from '../entities/user.entity';
import { IUserResponse } from '../interfaces/user-response.interface';

export class UserMapper {
  static toEntity(dto: IUserRequest): User {
    const user = new User({
      name: dto.name,
      email: dto.email,
      password: dto.password,
      username: dto.username,
      imgUrl: dto.imgUrl,
    });
    return user;
  }

  static toDTO(user: User): IUserResponse {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      imgUrl: user.imgUrl,
    };
  }
}
