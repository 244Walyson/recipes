import { IFindAllFilters } from 'src/recipe/core/interfaces/recipes/find-all-filters.interface';

export class QueryParamsDto implements IFindAllFilters {
  name?: string;
  category?: string;
  tags?: string[];
  cuisineStyles?: string[];
  difficultyLevel?: string;
  calories?: number;
  servingSize?: string;
  allergens?: string[];
  totalTime?: number[];
  viewCount?: number;
}
