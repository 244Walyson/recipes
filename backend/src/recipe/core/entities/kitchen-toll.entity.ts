export class KitchenTool {
  id: string;
  name: string;
  description?: string;

  constructor(props: Partial<KitchenTool>) {
    this.id = props.id ?? crypto.randomUUID();
    Object.assign(this, props);
  }
}
