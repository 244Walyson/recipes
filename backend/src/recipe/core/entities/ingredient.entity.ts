import { RecipeInvalidFieldValueException } from '../exceptions/invalid-field-value.exception';
import { RecipeIngredient } from './recipe-ingredient.entity';

export class Ingredient {
  id: string;
  name: string;
  recipeIngredients?: RecipeIngredient[] = [];

  constructor(props: Partial<Ingredient>) {
    this.id = props.id ?? crypto.randomUUID();
    Object.assign(this, props);

    this.validate();
  }

  validate(): void {
    const errorMessages: Record<string, string>[] = [];
    if (!this.name || this.name.length < 2) {
      errorMessages.push({
        name: 'O nome do ingrediente deve conter ao menos 3 letras',
      });
    }

    if (errorMessages.length > 0) {
      throw new RecipeInvalidFieldValueException(errorMessages);
    }
  }
}
