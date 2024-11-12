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
}
