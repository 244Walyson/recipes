export class MealType {
  id: string;
  name: string;

  constructor(props: Partial<MealType>) {
    this.id = props.id ?? crypto.randomUUID();
    Object.assign(this, props);
  }
}
