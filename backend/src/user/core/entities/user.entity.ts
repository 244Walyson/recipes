export class User {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  imgUrl: string;
  numberOfRecipes: number;
  numberOfFollowers: number;
  numberOfFollowings: number;
  createdAt: Date;
  isActive: boolean = true;

  constructor(partial: Partial<User>) {
    this.id = partial.id ?? crypto.randomUUID();
    Object.assign(this, partial);
  }
}
