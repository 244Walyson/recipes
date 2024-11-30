import { RecipeInvalidFieldValueException } from '../exceptions/invalid-field-value.exception';
import { Comment } from './comment.entity';
import { CuisineStyle } from './cuisine-style.entity';
import { MealType } from './meal-type.entity';
import { RecipeIngredient } from './recipe-ingredient.entity';

export class Recipe {
  id: string;
  name: string;
  preparationMethod: {
    step: number;
    title: string;
    description: string;
  }[];
  preparationTime: number;
  imgUrl?: string;
  macronutrients?: Record<string, number>;
  allergens?: string[];
  servingCount?: number;
  viewCount: number = 0;
  favoriteCount: number = 0;
  averageRating?: number;
  costEstimate?: number;
  additionalTips?: string;
  isPublished: boolean = true;
  version: number = 1;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  deleted: boolean = false;
  userId: string;
  comments?: Comment[] = [];
  recipeIngredients?: RecipeIngredient[] = [];
  mealTypes?: MealType[] = [];
  cuisineStyles?: CuisineStyle[] = [];

  constructor(props: Partial<Recipe>) {
    this.id = props.id ?? crypto.randomUUID();
    Object.assign(this, props);

    this.validate();
  }

  private validate(): void {
    const errorMessages: Record<string, string>[] = [];
    if (!this.name || this.name.length < 2) {
      errorMessages.push({
        nome: 'O nome da receita deve conter ao menos 3 letras',
      });
    }
    if (!this.preparationMethod || this.preparationMethod.length < 1) {
      errorMessages.push({
        ModoDePreparo: 'O Modo de preparo deve ser informado',
      });
    }
    if (
      !this.preparationTime ||
      isNaN(Number(this.preparationTime)) ||
      Number(this.preparationTime) <= 0
    ) {
      errorMessages.push({
        tempoDePreparo: 'O tempo de preparo deve ser informado corretamente',
      });
    }

    if (!this.userId) {
      errorMessages.push({ idDoUsuario: 'O id do usuario deve ser informado' });
    }

    if (errorMessages.length > 0) {
      throw new RecipeInvalidFieldValueException(errorMessages);
    }
  }
}
