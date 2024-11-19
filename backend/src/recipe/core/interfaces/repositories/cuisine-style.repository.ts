import { CuisineStyle } from '../../entities/cuisine-style.entity';
import { ICuisineStyle } from '../cuisine-style/cousine-styles.interface';

export interface ICuisineStyleRepository {
  create(cuisineStyle: CuisineStyle): Promise<ICuisineStyle>;
  findById(id: string): Promise<ICuisineStyle>;
  findAll({
    name,
    offset,
    limit,
  }: {
    name: string;
    offset: number;
    limit: number;
  }): Promise<{ total: number; data: ICuisineStyle[] }>;
  findByName(name: string): Promise<ICuisineStyle>;
}
