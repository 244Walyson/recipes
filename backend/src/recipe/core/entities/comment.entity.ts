import { RecipeInvalidFieldValueException } from '../exceptions/invalid-field-value.exception';

export class Comment {
  id: string;
  content: string;
  userId: string;
  recipeId: string;
  createdAt: Date = new Date();

  constructor(props: Partial<Comment>) {
    this.id = props.id ?? crypto.randomUUID();
    Object.assign(this, props);
  }

  private validate(): void {
    const errorMessages: Record<string, string>[] = [];
    if (!this.content || this.content.length < 1) {
      errorMessages.push({
        content: 'O conteúdo do comentário não pode ser vazio',
      });
    }
    if (!this.userId) {
      errorMessages.push({ userId: 'O id do usuario deve ser informado' });
    }
    if (!this.recipeId) {
      errorMessages.push({ recipeId: 'O id da receita deve ser informado' });
    }

    if (errorMessages.length > 0) {
      throw new RecipeInvalidFieldValueException(errorMessages);
    }
  }
}
