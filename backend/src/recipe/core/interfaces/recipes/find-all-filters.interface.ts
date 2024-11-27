export interface IFindAllFilters {
  name?: string;
  mealTypes?: string[];
  ingredients?: string[];
  servingCount?: string;
  price?: number[];
  allergens?: string[];
  preparationTime?: number[];
  orderBy?: string;
}
