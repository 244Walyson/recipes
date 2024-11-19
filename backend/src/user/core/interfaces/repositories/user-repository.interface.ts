import { User } from '../../entities/user.entity';
import { IUserResponse } from '../user/user-response.interface';

export interface IFindAllParams {
  name?: string;
  offset: number;
  limit: number;
}

export interface IUserRepository {
  create(user: User): Promise<IUserResponse>;
  update(id: string, user: User): Promise<IUserResponse>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<IUserResponse>;
  findByEmail(email: string): Promise<IUserResponse>;
  findByUsername(username: string): Promise<IUserResponse>;
  findAll(
    params: IFindAllParams,
  ): Promise<{ total: number; users: IUserResponse[] }>;
}
