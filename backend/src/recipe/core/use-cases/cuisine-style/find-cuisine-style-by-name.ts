export class FindCuisineStyleByNameUseCase {
  constructor(private cuisineStyleRepository: any) {}

  async execute(name: string) {
    return this.cuisineStyleRepository.findByName(name);
  }
}
