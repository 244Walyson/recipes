export class CuisineStyle {
  id: string;
  name: string;

  constructor(props: Partial<CuisineStyle>) {
    this.id = props.id ?? crypto.randomUUID();
    Object.assign(this, props);
  }
}
