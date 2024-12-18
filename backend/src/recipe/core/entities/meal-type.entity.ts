import { RecipeInvalidFieldValueException } from '../exceptions/invalid-field-value.exception';

export class MealType {
  id: string;
  name: string;

  constructor(props: Partial<MealType>) {
    this.id = props.id ?? crypto.randomUUID();
    Object.assign(this, props);

    this.validate();
  }

  private validate(): void {
    const errorMessages: Record<string, string>[] = [];
    if (!this.name || this.name.length < 2) {
      errorMessages.push({
        name: 'O nome do tipo de refeição deve conter ao menos 3 letras',
      });
    }

    if (errorMessages.length > 0) {
      throw new RecipeInvalidFieldValueException(errorMessages);
    }
  }
}
