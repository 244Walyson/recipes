import { CuisineStyle } from '../../entities/cousine-style.entity';

export interface ICuisineStyleRepository {
  create(cuisineStyle: CuisineStyle): Promise<CuisineStyle>;
  findById(id: string): Promise<CuisineStyle>;
  findAll({
    name,
    offset,
    limit,
  }: {
    name: string;
    offset: number;
    limit: number;
  }): Promise<{ total: number; data: CuisineStyle[] }>;
  findByName(name: string): Promise<CuisineStyle>;
}
