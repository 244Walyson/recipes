import { ICuisineStyle } from '../interfaces/cuisine-style/cousine-styles.interface';
import { CuisineStyle } from '../entities/cousine-style.entity';

export class CuisineStyleMapper {
  static toEntity(cousineStyle: ICuisineStyle): CuisineStyle {
    return new CuisineStyle({
      id: cousineStyle.id,
      name: cousineStyle.name,
    });
  }
}
