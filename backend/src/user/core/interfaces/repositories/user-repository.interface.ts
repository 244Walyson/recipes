import { User } from '../../entities/user.entity';

export interface IFindAllParams {
  name?: string;
  offset: number;
  limit: number;
}

export interface IUserRepository {
  create(user: User): Promise<User>;
  update(id: string, user: User): Promise<User>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(params: IFindAllParams): Promise<{ total: number; users: User[] }>;
}
