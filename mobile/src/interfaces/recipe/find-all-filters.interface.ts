export interface IFindAllFilters {
  name?: string;
  mealType?: string[];
  ingredients?: string[];
  servingCount?: string;
  price?: [number, number];
  allergens?: string[];
  preparationTime?: number[];
  orderBy?: string;
}
