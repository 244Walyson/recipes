import { CuisineStyle } from '../../entities/cousine-style.entity';

export interface ICuisineStyleRepository {
  create(cuisineStyle: CuisineStyle): Promise<CuisineStyle>;
  findById(id: string): Promise<CuisineStyle>;
  findAll(): Promise<CuisineStyle[]>;
  findByName(name: string): Promise<CuisineStyle>;
}
