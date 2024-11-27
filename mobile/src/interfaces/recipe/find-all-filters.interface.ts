export interface IFindAllFilters {
  name?: string;
  mealTypes?: string[];
  ingredients?: string[];
  servingCount?: string;
  price?: [number, number];
  allergens?: string[];
  preparationTime?: number[];
  orderBy?: string;
}
