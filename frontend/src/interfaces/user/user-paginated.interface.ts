import { IUserProjection } from './user-projection.interface';

export interface IUserPaginated {
  data: IUserProjection[];
  total: number;
  page: number;
  limit: number;
}
